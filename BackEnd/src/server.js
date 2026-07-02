require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnection = require("./database/dbConnection");

const signUp = require("./routes/sign-up");
const signIn = require("./routes/sign-in");
const signOut = require("./routes/sign-out");

const app = express();

// Connect to MongoDB
dbConnection();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://192.168.0.104:5173",
            "https://your-netlify-site.netlify.app" // Replace this after deploying your frontend
        ],
        credentials: true,
    })
);

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ArBank Backend is running 🚀",
    });
});

// Routes
app.use("/", signUp);
app.use("/", signIn);
app.use("/", signOut);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});