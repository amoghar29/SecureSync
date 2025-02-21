"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = void 0;
const signout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
exports.signout = signout;
