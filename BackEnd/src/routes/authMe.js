const express = require("express");
const jwt = require("jsonwebtoken");

const authMe = express.Router();

authMe.get("/auth/me", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not logged in.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            message: "User authenticated.",
            user: {
                id: decoded.id,
                fullName: decoded.fullName,
                username: decoded.username,
                email: decoded.email,
                phone: decoded.phone,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
});

module.exports = authMe;