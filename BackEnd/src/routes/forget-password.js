const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../database/models/User')
const PasswordResetOTP = require('../database/models/PasswordResetOtp')
const sendEmail = require('../essentials/mails/send-mail')

const forgetPassword = express.Router()

forgetPassword.post('/forget-password', async (req, res) => {
    try {
        const { username, otp, newPassword, confirmPassword, step } = req.body

        if (step == 1) {
            const user = await User.findOne({
                $or: [
                    { username },
                    { email: username }
                ]
            })

            if (!user) {
                return res.status(404).json({
                    success: 1,
                    message: 'User not found.'
                })
            }

            const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

            const otpHash = await bcrypt.hash(otpCode, 10)

            await PasswordResetOTP.deleteMany({
                userId: user._id
            })

            await PasswordResetOTP.create({
                userId: user._id,
                username: user.username,
                email: user.email,
                otpHash,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            })

            await sendEmail({
                to: user.email,
                subject: 'Reset Password',
                html: `
                    <h2>Password Reset</h2>
                    <p>Your OTP is:</p>
                    <h1>${otpCode}</h1>
                    <p>This OTP will expire in 5 minutes.</p>
                `
            })

            return res.status(200).json({
                success: 2,
                message: 'OTP sent successfully.'
            })
        }
        if (step == 2) {
            const otpRecord = await PasswordResetOTP.findOne({
                $or: [
                    { username },
                    { email: username }
                ]
            })

            if (!otpRecord) {
                return res.status(404).json({
                    success: 2,
                    message: 'OTP not found.'
                })
            }

            if (otpRecord.expiresAt < new Date()) {
                await PasswordResetOTP.deleteOne({
                    _id: otpRecord._id
                })

                return res.status(400).json({
                    success: 2,
                    message: 'OTP has expired.'
                })
            }

            const validOTP = await bcrypt.compare(
                otp,
                otpRecord.otpHash
            )

            if (!validOTP) {
                return res.status(400).json({
                    success: 2,
                    message: 'Invalid OTP.'
                })
            }

            return res.status(200).json({
                success: 3,
                message: 'OTP verified successfully.'
            })
        }
        if (step == 3) {

            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    success: 1,
                    message: 'Passwords do not match.'
                })
            }

            const user = await User.findOne({
                $or: [
                    { username },
                    { email: username }
                ]
            })

            if (!user) {
                return res.status(404).json({
                    success: 1,
                    message: 'User not found.'
                })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            user.password = hashedPassword

            await user.save()

            await PasswordResetOTP.deleteMany({
                userId: user._id
            })

            return res.status(200).json({
                success: 4,
                message: 'Password changed successfully.'
            })
        }

        return res.status(400).json({
            success: 1,
            message: 'Invalid step.'
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: 1,
            message: error.message
        })
    }
})

module.exports = forgetPassword