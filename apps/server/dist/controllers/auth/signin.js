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
exports.signin = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const auth_validations_1 = require("../../validations/auth.validations");
const db_1 = require("../../utils/db");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
const signin = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = auth_validations_1.signinPayloadSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message,
            });
        }
        // Find user with email
        const user = await db_1.client.user.findUnique({
            where: { email: value.email },
            select: {
                id: true,
                email: true,
                password: true,
            },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                data: null,
                error: "User does not exist",
            });
            return;
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(value.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                data: null,
                error: "Invalid password",
            });
            return;
        }
        // Generate JWT token
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, JWT_SECRET, {
            expiresIn: "1h",
            algorithm: "HS256",
        });
        // Set secure cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            path: "/",
        };
        // Set cookie and send response
        res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
            },
        });
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error",
        });
    }
};
exports.signin = signin;
