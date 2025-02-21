"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const totp_1 = __importDefault(require("./totp"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use("/totp", auth_2.authMiddleware, totp_1.default);
router.use("/auth", auth_1.default);
exports.default = router;
