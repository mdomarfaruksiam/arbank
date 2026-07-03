import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Input from "../Utils/Input";
import Button from "../Utils/Button";
import Loading from "./Loading";

import links from "../Essentials/links";

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false);
    const [sentOtp, setSentOtp] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "",
        otp: "",
    });

    const [err, setErr] = useState({
        username: "",
        otp: "",
    });

    const validate = () => {

        const errors = {
            username: "",
            otp: "",
        };

        if (!credentials.username.trim()) {
            errors.username = "Required";
        }

        if (sentOtp && !credentials.otp.trim()) {
            errors.otp = "Required";
        }

        setErr(errors);

        return !errors.username && !errors.otp;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            const response = await axios.post(
                `${links.serverName}/forget-password`,
                credentials,
                {
                    withCredentials: true,
                }
            );

            toast.success(response.data.message);

            if (response.data.message === "OTP sent successfully.") {

                setSentOtp(true);

                setErr({
                    username: "",
                    otp: "",
                });

                return;
            }

            if (
                response.data.message ===
                "OTP verified successfully."
            ) {
                navigate("/reset-password");
                return;
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (field, value) => {

        setCredentials((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErr((prev) => ({
            ...prev,
            [field]: value.trim() ? "" : "Required",
        }));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="container m-auto flex items-center justify-center px-4">.
            <section className="w-full my-2 max-w-md rounded-2xl bg-surface p-6 shadow-xl transition-all duration-300">

                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold text-primary">
                        ARBank
                    </h1>

                    <p>
                        {sentOtp
                            ? "Verify OTP"
                            : "Forgot Password"}
                    </p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >

                    {!sentOtp ? (

                        <Input
                            label="Username"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={(e) =>
                                handleChange(
                                    "username",
                                    e.target.value
                                )
                            }
                            err={err.username}
                        />

                    ) : (

                        <Input
                            label="OTP"
                            id="otp"
                            type="text"
                            placeholder="Enter the OTP you received"
                            value={credentials.otp}
                            onChange={(e) =>
                                handleChange(
                                    "otp",
                                    e.target.value
                                )
                            }
                            err={err.otp}
                        />

                    )}

                    <Button
                        type="submit"
                        className="bg-success"
                        label={
                            sentOtp
                                ? "Verify OTP"
                                : "Send Reset Code"
                        }
                    />

                </form>

            </section>
        </main>
    );
}