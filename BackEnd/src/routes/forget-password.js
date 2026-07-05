const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");
const PasswordResetOTP = require("../database/models/PasswordResetOtp");
const sendEmail = require("../essentials/mails/send-mail");

const forgetPassword = express.Router();

forgetPassword.post("/forget-password", async (req, res) => {
    const { username, otp, newPassword, confirmPassword, step } = req.body;
    if (username && step == 1) {
        try {
            const user = await User.findOne({
                $or: [
                    { username },
                    { email: username }]
            });
            if (!user) {
                return res.status(404).json({
                    success: 1,
                    message: "User not found."
                });
            } else {
                const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

                const otpEntry = new PasswordResetOTP({
                    userId: user._id,
                    username: user.username,
                    otpHash: otpCode,
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
                });

                await PasswordResetOTP.deleteMany({
                    username: user.username,
                });
                await otpEntry.save();

                await sendEmail({
                    to: user.email,
                    subject: "Password Reset OTP",
                    text: `Your OTP for password reset is: ${otpCode}. It will expire in 5 minutes.`,
                });

                return res.status(200).json({
                    success: 2,
                    message: "OTP sent successfully."
                });
            }
        } catch (error) {
            console.error("Forget Password Error:");
            console.error(error);
            return res.status(500).json({
                success: 1,
                message: "An error occurred while fetching the user."
            });
        }
    }
});

module.exports = forgetPassword;