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
exports.signinPayloadSchema = exports.signupPayloadSchema = void 0;
const Joi = __importStar(require("joi"));
exports.signupPayloadSchema = Joi.object().keys({
    name: Joi.string()
        .trim()
        .required()
        .min(1)
        .max(20)
        .regex(/^[^!@#$%^&*(){}\[\]\\\.;'",.<>/?`~|0-9]*$/)
        .messages({
        "string.base": "Name must be string",
        "string.min": "Name cannot be empty",
        "any.required": "Name is required",
        "string.pattern.base": "Name should only contain alphabets",
    }),
    email: Joi.string()
        .trim()
        .required()
        .max(50)
        .regex(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        .messages({
        "string.base": "Email must be a string",
        "string.max": "Email length must be 50 or fewer",
        "any.required": "Email is required",
        "string.pattern.base": "Invalid email",
    }),
    password: Joi.string().trim().required().min(8).max(30).messages({
        "string.base": "Password must be string",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password must be 30 characters or fewer",
        "any.required": "Password is required",
    }),
    confirmPassword: Joi.any().required().equal(Joi.ref("password")).messages({
        "any.only": "Password and confirm password do not match",
    }),
});
exports.signinPayloadSchema = Joi.object().keys({
    email: Joi.string()
        .trim()
        .required()
        .regex(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        .messages({
        "string.base": "Email must be a string",
        "any.required": "Email is required",
        "string.pattern.base": "Invalid email",
    }),
    password: Joi.string().trim().required().messages({
        "string.base": "Password must be string",
        "any.required": "Password is required",
    }),
});
