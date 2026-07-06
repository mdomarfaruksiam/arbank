const express = require("express");
const authToken = require("../essentials/middleWares/authToken");

const authMe = express.Router();

authMe.get("/auth/me", authToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User authenticated.",
        user: req.user,
    });
});

module.exports = authMe;