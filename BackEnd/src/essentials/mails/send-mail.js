const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    await transporter.sendMail({
        from: `"ArBank" <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        html,
    });
};

module.exports = sendEmail;