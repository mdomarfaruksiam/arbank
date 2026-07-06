const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../database/models/User')

const signIn = express.Router()

signIn.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required.',
            })
        }

        const user = await User.findOne({
            $or: [
                { email: username },
                { username: username }
            ]
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            })
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                phone: user.phone,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d',
            }
        )

        // Save token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        res.status(200).json({
            success: true,
            message: 'Sign in successful.',
            user: {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                phone: user.phone,
            },
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = signIn