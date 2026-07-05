import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import Input from "../Utils/Input";
import Button from "../Utils/Button";
import links from "../Essentials/links";

export default function ForgetPassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [credentialErrors, setCredentialErrors] = useState({
        username: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const setCredential = (e) => {
        const { name, value } = e.target;

        setUserCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));

        setCredentialErrors((prev) => ({
            ...prev,
            [name]: value ? "" : `Please enter your ${name}`,
        }));
    };

    const validate = () => {
        const errors = {};

        if (step === 1 && !userCredentials.username) {
            errors.username = "Please enter your username or email";
        }

        if (step === 2 && !userCredentials.otp) {
            errors.otp = "Please enter the OTP";
        }

        if (step === 3) {
            if (!userCredentials.newPassword) {
                errors.newPassword = "Please enter your new password";
            }

            if (!userCredentials.confirmPassword) {
                errors.confirmPassword = "Please confirm your new password";
            }

            if (
                userCredentials.newPassword &&
                userCredentials.confirmPassword &&
                userCredentials.newPassword !== userCredentials.confirmPassword
            ) {
                errors.confirmPassword = "Passwords do not match";
            }
        }

        setCredentialErrors((prev) => ({
            ...prev,
            ...errors,
        }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await axios.post(
                `${links.serverName}/forget-password`,
                {
                    ...userCredentials,
                    step,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success(response.data.message);

            if (step === 1) {
                setStep(2);
            } else if (step === 2) {
                setStep(3);
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container m-auto flex items-center justify-center px-4">
            <section className="w-full my-2 max-w-md rounded-2xl bg-surface p-6 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold text-primary">
                        ARBank
                    </h1>

                    <p>Reset your password in a few easy steps.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step !== 3 ? (
                        <>
                            <Input
                                placeholder="Username or Email"
                                name="username"
                                value={userCredentials.username}
                                onChange={setCredential}
                                err={credentialErrors.username}
                            />

                            {step === 2 && (
                                <Input
                                    placeholder="OTP"
                                    name="otp"
                                    value={userCredentials.otp}
                                    onChange={setCredential}
                                    err={credentialErrors.otp}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <Input
                                placeholder="New Password"
                                type="password"
                                name="newPassword"
                                value={userCredentials.newPassword}
                                onChange={setCredential}
                                err={credentialErrors.newPassword}
                            />

                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={userCredentials.confirmPassword}
                                onChange={setCredential}
                                err={credentialErrors.confirmPassword}
                            />
                        </>
                    )}

                    <Button
                        type="submit"
                        label={loading ? "Please wait..." : "Submit"}
                    />
                </form>
            </section>
        </main>
    );
}