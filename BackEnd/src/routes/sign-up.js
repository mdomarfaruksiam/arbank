const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../database/models/User')

const router = express.Router()

router.post('/sign-up', async (req, res) => {

    try {

        const {
            fullName,
            username,
            email,
            phone,
            password
        } = req.body

        const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
                { phone }
            ]
        })

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            fullName,
            username,
            email,
            phone,
            password: hashedPassword,
        })

        await user.save()

        res.status(201).json({
            success: true,
            message: 'Account created successfully.',
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }

})

module.exports = router