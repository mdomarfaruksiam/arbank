const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../database/models/User')

const authMe = express.Router()

authMe.get('/auth/me', async (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'You are not logged in.',
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        try {
            const user = await User.findOne({ username: decoded.username })
            res.status(200).json({
                success: true,
                message: 'User authenticated.',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                },
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    } catch (error) {
        console.error(error)

        res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        })
    }
})

module.exports = authMe