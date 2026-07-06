const express = require('express')

const signOut = express.Router()

signOut.post('/sign-out', (req, res) => {

    Object.keys(req.cookies).forEach((cookieName) => {
        res.clearCookie(cookieName)
    })

    res.json({
        success: true,
        message: 'All cookies cleared.',
    })
})

module.exports = signOut
