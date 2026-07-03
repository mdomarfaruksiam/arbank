const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");
const PasswordResetOTP = require("../database/models/PasswordResetOtp");
const sendEmail = require("../essentials/mails/send-mail");

const forgetPassword = express.Router();

forgetPassword.post("/forget-password", async (req, res) => {
    try {

        const { username, otp } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required.",
            });
        }


        if (otp) {

            const userOtp = await PasswordResetOTP.findOne({ username });

            if (!userOtp) {
                return res.status(400).json({
                    success: false,
                    message: "OTP not found or expired.",
                });
            }

            if (userOtp.expiresAt < new Date()) {

                await PasswordResetOTP.deleteOne({
                    _id: userOtp._id,
                });

                return res.status(400).json({
                    success: false,
                    message: "OTP has expired.",
                });
            }

            const isMatch = await bcrypt.compare(
                otp,
                userOtp.otpHash
            );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP.",
                });
            }

            // OTP should never be reused
            await PasswordResetOTP.deleteOne({
                _id: userOtp._id,
            });

            return res.status(200).json({
                success: true,
                message: "OTP verified successfully.",
            });

        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const otpToSend = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpHash = await bcrypt.hash(
            otpToSend,
            10
        );

        await PasswordResetOTP.deleteMany({
            username,
        });

        const otpDocument = await PasswordResetOTP.create({
            userId: user._id,
            username,
            otpHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        try {

            await sendEmail({
                to: user.email,
                subject: "ArBank Password Reset OTP",
                text: `Your OTP is ${otpToSend}. It expires in 5 minutes.`,
            });

        } catch (emailError) {

            await PasswordResetOTP.deleteOne({
                _id: otpDocument._id,
            });

            throw emailError;
        }

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });

    }
});

module.exports = forgetPassword;