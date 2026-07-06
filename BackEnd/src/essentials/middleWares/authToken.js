const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not logged in.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.id,
            fullName: decoded.fullName,
            username: decoded.username,
            email: decoded.email,
            phone: decoded.phone,
            createdAt: decoded.createdAt
        }).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        // Attach the authenticated user to the request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

module.exports = authToken;