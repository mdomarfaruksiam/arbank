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

                console.log("Forgot password requested for:", email);

                try {
                    await sendEmail({
                        to: email,
                        subject: "Reset Password",
                        html,
                    });

                    console.log("Email sent successfully");
                } catch (err) {
                    console.error("Email sending failed:", err);
                }

                return res.status(200).json({
                    success: 2,
                    message: "OTP sent successfully to your email."
                });
            }
        } catch (error) {
            console.error("Forget Password Error");
            console.error(error);
            console.error(error.message);
            console.error(error.stack);

            return res.status(500).json({
                success: 1,
                message: error.message
            });
        }
    }
});

module.exports = forgetPassword;