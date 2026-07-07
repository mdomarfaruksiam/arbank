const express = require('express')

const signOut = express.Router()

signOut.post('/sign-out', (req, res) => {
    Object.keys(req.cookies).forEach((cookieName) => {
        res.clearCookie(cookieName, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
    });

    res.json({
        success: true,
        message: 'Signed out successfully.',
    });
});

module.exports = signOut
