"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTOTP = exports.generator = void 0;
const db_1 = require("../../utils/db");
const otplib_1 = require("otplib");
const crypto = __importStar(require("crypto"));
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const generator = (secretRecord) => {
    const serviceName = secretRecord.serviceName;
    // Decrypt the stored secret
    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(ENCRYPTION_KEY, "hex"), Buffer.from(secretRecord.iv, "hex"));
    decipher.setAuthTag(Buffer.from(secretRecord.authTag, "hex"));
    let decryptedSecret = decipher.update(secretRecord.encryptedSecret, "hex", "utf8");
    decryptedSecret += decipher.final("utf8");
    // Generate TOTP using otplib with RFC3548 base32 encoded secret
    const token = otplib_1.authenticator.generate(decryptedSecret);
    // Get remaining time in the current window
    const remainingTime = otplib_1.authenticator.timeRemaining();
    const validUntil = new Date(Date.now() + remainingTime * 1000);
    return {
        token,
        validUntil,
        serviceName,
    };
};
exports.generator = generator;
const generateTOTP = async (req, res) => {
    try {
        const userId = req.userId;
        const { serviceName } = req.params;
        const secretRecord = await db_1.client.tOTPSecret.findFirst({
            where: {
                userId,
                serviceName,
            },
        });
        if (!secretRecord) {
            res.status(404).json({
                success: false,
                data: null,
                error: "Secret key not found",
            });
            return;
        }
        const { token, validUntil } = (0, exports.generator)(secretRecord);
        res.status(200).json({
            success: true,
            data: {
                code: token,
                validUntil,
            },
        });
    }
    catch (error) {
        console.error("Generate TOTP error:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error",
        });
    }
};
exports.generateTOTP = generateTOTP;
