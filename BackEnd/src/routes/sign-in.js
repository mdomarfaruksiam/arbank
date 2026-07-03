const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");

const signIn = express.Router();

signIn.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "username and password are required.",
            });
        }

        // username using email or username
        const user = await User.findOne({
            $or: [
                { email: username },
                { username: username }
            ]
        });

        if (!user || await !bcrypt.compare(password, user.password)) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Sign in successful.",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                phone: user.phone,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});

module.exports = signIn;