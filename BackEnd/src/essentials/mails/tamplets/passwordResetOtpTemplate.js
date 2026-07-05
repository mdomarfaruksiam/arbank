const passwordResetOtpTemplate = (otpCode) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>ARBank Password Reset</title>
    </head>

    <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">

                    <table width="600" cellpadding="20" cellspacing="0" style="background:#fff;border-radius:10px;">

                        <tr>
                            <td align="center" style="background:#2563eb;color:#fff;">
                                <h1>ARBank</h1>
                                <p>Password Reset</p>
                            </td>
                        </tr>

                        <tr>
                            <td>

                                <h2>Password Reset Request</h2>

                                <p>
                                    We received a request to reset your password.
                                </p>

                                <p>Your verification code is:</p>

                                <div
                                    style="
                                        font-size:36px;
                                        font-weight:bold;
                                        text-align:center;
                                        letter-spacing:8px;
                                        color:#2563eb;
                                        margin:30px 0;
                                    "
                                >
                                    ${otpCode}
                                </div>

                                <p>
                                    This OTP will expire in
                                    <strong>5 minutes</strong>.
                                </p>

                                <p>
                                    Never share this code with anyone.
                                </p>

                                <br>

                                Regards,<br>
                                <strong>ARBank Security Team</strong>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

module.exports = passwordResetOTP;