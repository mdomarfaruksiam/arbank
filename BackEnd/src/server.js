require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const dbConnection = require('./database/dbConnection')

const signUp = require('./routes/sign-up')
const signIn = require('./routes/sign-in')
const signOut = require('./routes/sign-out')
const forgetPassword = require('./routes/forget-password')

const authMe = require('./routes/authMe')

const app = express()

dbConnection()

// Middleware
app.use(express.json())
app.use(cookieParser())


app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://192.168.0.103:5173',
            'https://arbank.netlify.app',
            'https://arbank2.netlify.app',
        ],
        credentials: true,
    })
)

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'ArBank Backend is running 🚀',
    })
})

// sign in related routes
app.use('/', signUp)
app.use('/', signIn)
app.use('/', signOut)
app.use('/', forgetPassword)
app.use('/', authMe)

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})