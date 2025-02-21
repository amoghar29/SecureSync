"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const check = async (req, res) => {
    try {
        if (req.userId) {
            res.json({ success: true });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
exports.check = check;
