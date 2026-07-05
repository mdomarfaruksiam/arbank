const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("SMTP Server Connected");
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    return transporter.sendMail({
        from: `"ARBank" <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        html,
    });
};

module.exports = sendEmail;