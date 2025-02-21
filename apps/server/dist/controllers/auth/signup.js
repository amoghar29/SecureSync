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
exports.signup = void 0;
const db_1 = require("../../utils/db");
const auth_validations_1 = require("../../validations/auth.validations");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;
const signup = async (req, res) => {
    try {
        // Validate the request body
        const { error, value } = auth_validations_1.signupPayloadSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                error: error.message,
                data: null,
            });
            return;
        }
        // Check if the email is already used
        const isEmailAlreadyUsed = await db_1.client.user.findUnique({
            where: { email: value.email },
        });
        if (isEmailAlreadyUsed) {
            res.status(409).json({
                success: false,
                error: "Email already used",
                data: null,
            });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(value.password, saltRounds);
        // Create the user
        const user = await db_1.client.user.create({
            data: {
                email: value.email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, JWT_SECRET, {
            expiresIn: "1h",
            algorithm: "HS256",
        });
        res
            .status(201)
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            path: "/",
        })
            .json({
            success: true,
            message: "User signed up successfully",
            data: { token },
        });
    }
    catch (error) {
        // handle any errors that occur during the process
        res.status(500).json({
            success: false,
            error: "Internal server error",
            data: null,
        });
    }
};
exports.signup = signup;
