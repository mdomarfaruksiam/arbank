import React, { useState } from "react";
import axios from "axios";

import Input from "../Utils/Input";
import Button from "../Utils/Button";
import links from "../Essentials/links";

export default function SignUp() {
    const [step, setStep] = useState(1);

    const [credentials, setCredentials] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [err, setErr] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        setCredentials((prev) => ({
            ...prev,
            [id]: value,
        }));

        setErr((prev) => ({
            ...prev,
            [id]: value.trim() ? "" : "Required",
        }));
    };

    const nextStep = () => {
        if (step === 1) {
            const errors = {};

            if (!credentials.fullName.trim())
                errors.fullName = "Full name is required.";

            if (!credentials.username.trim())
                errors.username = "Username is required.";


            if (!credentials.phone.trim())
                errors.phone = "Phone number is required.";

            setErr((prev) => ({
                ...prev,
                ...errors,
            }));

            if (Object.keys(errors).length) return;
        }

        setStep(2);
    };

    const previousStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!credentials.password.trim())
            errors.password = "Password is required.";

        if (!credentials.confirmPassword.trim())
            errors.confirmPassword = "Confirm your password.";

        if (
            credentials.password &&
            credentials.confirmPassword &&
            credentials.password !== credentials.confirmPassword
        ) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setErr((prev) => ({
            ...prev,
            ...errors,
        }));

        if (Object.keys(errors).length) return;

        try {
            const response = await axios.post(
                links.serverName + "/sign-up",
                credentials
            );

            console.log(response.data);
            alert("Registration Successful!");

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Progress */}
            <div className="flex gap-2">
                <div
                    className={`h-2 flex-1 rounded ${step >= 1 ? "bg-primary" : "bg-border"
                        }`}
                />
                <div
                    className={`h-2 flex-1 rounded ${step >= 2 ? "bg-primary" : "bg-border"
                        }`}
                />
            </div>

            {/* STEP 1 */}

            {step === 1 && (
                <>
                    <Input
                        label="Full Name"
                        id="fullName"
                        placeholder="Enter your full name"
                        value={credentials.fullName}
                        onChange={handleChange}
                        err={err.fullName}
                    />

                    <Input
                        label="Username"
                        id="username"
                        placeholder="Choose a username"
                        value={credentials.username}
                        onChange={handleChange}
                        err={err.username}
                    />

                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                        err={err.email}
                    />

                    <Input
                        label="Phone Number"
                        id="phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={credentials.phone}
                        onChange={handleChange}
                        err={err.phone}
                    />

                    <Button
                        type="button"
                        label="Next"
                        onClick={nextStep}
                        className="bg-primary"
                    />
                </>
            )}

            {/* STEP 2 */}

            {step === 2 && (
                <>
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={handleChange}
                        err={err.password}
                    />

                    <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={credentials.confirmPassword}
                        onChange={handleChange}
                        err={err.confirmPassword}
                    />

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            label="Back"
                            className="bg-secondary"
                            onClick={previousStep}
                        />

                        <Button
                            type="submit"
                            label="Create Account"
                            className="bg-success"
                        />
                    </div>
                </>
            )}
        </form>
    );
}