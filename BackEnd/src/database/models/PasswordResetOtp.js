const mongoose = require('mongoose')

const passwordResetOTPSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        username: {
            type: String,
            required: true,
        },
        email: {

            type: String,
            required: true,
        },
        otpHash: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// Automatically delete the document after expiresAt
passwordResetOTPSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
)

module.exports = mongoose.model(
    'PasswordResetOTP',
    passwordResetOTPSchema
)