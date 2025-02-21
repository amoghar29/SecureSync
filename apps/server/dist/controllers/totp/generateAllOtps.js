"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllTOTPs = void 0;
const db_1 = require("../../utils/db");
const totpGenerator_1 = require("./totpGenerator");
const generateAllTOTPs = async (req, res) => {
    try {
        const userId = req.userId;
        // Get all secrets for the user
        const secretRecords = await db_1.client.tOTPSecret.findMany({
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
        const totps = secretRecords.map((record) => {
            return (0, totpGenerator_1.generator)(record);
        });
        res.status(200).json({
            success: true,
            data: totps,
        });
    }
    catch (error) {
        console.error("Generate all TOTPs error:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error",
        });
    }
};
exports.generateAllTOTPs = generateAllTOTPs;
