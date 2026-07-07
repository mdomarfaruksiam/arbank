const express = require('express')

const signOut = express.Router()

signOut.post('/sign-out', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });

    res.json({
        success: true,
        message: 'Signed out successfully.',
    });
});

module.exports = signOut
