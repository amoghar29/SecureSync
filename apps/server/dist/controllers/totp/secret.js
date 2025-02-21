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
exports.addSecret = void 0;
const db_1 = require("../../utils/db");
const totp_validations_1 = require("../../validations/totp.validations");
const otplib_1 = require("otplib");
const crypto = __importStar(require("crypto"));
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const addSecret = async (req, res) => {
    const { error, value } = totp_validations_1.addSecretSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: error.message,
        });
        return;
    }
    const userId = req.userId;
    try {
        const secret = value.secretKey.split(" ").join("");
        // Validate the secret is base32 encoded
        try {
            otplib_1.authenticator.decode(secret);
        }
        catch (error) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Invalid base32 encoded secret key",
            });
            return;
        }
        // Encrypt the secret before storing
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ENCRYPTION_KEY, "hex"), iv);
        let encryptedSecret = cipher.update(secret, "utf8", "hex");
        encryptedSecret += cipher.final("hex");
        const authTag = cipher.getAuthTag();
        await db_1.client.tOTPSecret.create({
            data: {
                userId,
                serviceName: value.serviceName,
                encryptedSecret: encryptedSecret,
                iv: iv.toString("hex"),
                authTag: authTag.toString("hex"),
            },
        });
        const otpauth = otplib_1.authenticator.keyuri(userId, value.serviceName, secret);
        res.status(201).json({
            success: true,
            message: "Secret key stored successfully",
            data: {
                otpauthUrl: otpauth,
            },
        });
    }
    catch (error) {
        console.error("Error adding secret: ", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error",
        });
    }
};
exports.addSecret = addSecret;
