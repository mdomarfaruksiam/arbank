require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/dbConnection");

const express = require("express");
const app = express();

dbConnection();

const signUp = require("./routes/sign-up");
const signIn = require("./routes/sign-in");
const signOut = require("./routes/sign-out");


const hostName = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://192.168.0.104:5173",
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ArBank Backend is running 🚀",
    });
});

app.use('/', signUp)
app.use("/", signIn);
app.use("/", signOut);

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://192.168.0.104:${port}`);
});