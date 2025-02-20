import { authenticator } from "otplib";
import { client } from "../../utils/db";
import { Request, Response } from "express";
import * as crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;

export const generateAllTOTPs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    // Get all secrets for the user
    const secretRecords = await client.tOTPSecret.findMany({
      where: {
        userId,
      },
    });

    if (!secretRecords.length) {
      res.status(404).json({
        success: false,
        data: null,
        error: "No TOTP secrets found",
      });
      return;
    }

    // Generate TOTPs for each secret
    const totps = await Promise.all(
      secretRecords.map(async (record) => {
        // Decrypt the stored secret
        const decipher = crypto.createDecipheriv(
          "aes-256-gcm",
          Buffer.from(ENCRYPTION_KEY, "hex"),
          Buffer.from(record.iv, "hex")
        );

        decipher.setAuthTag(Buffer.from(record.authTag, "hex"));

        let decryptedSecret = decipher.update(
          record.encryptedSecret,
          "hex",
          "utf8"
        );
        decryptedSecret += decipher.final("utf8");

        // Generate TOTP
        const token = authenticator.generate(decryptedSecret);
        const remainingTime = authenticator.timeRemaining();
        const validUntil = new Date(Date.now() + remainingTime * 1000);

        return {
          serviceName: record.serviceName,
          code: token,
          validUntil,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: totps,
    });
  } catch (error) {
    console.error("Generate all TOTPs error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};
