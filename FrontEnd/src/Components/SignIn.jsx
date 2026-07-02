import React, { useState } from "react";
import axios from 'axios';

import Input from "../Utils/Input";
import Button from "../Utils/Button";
import links from "../Essentials/links";

export default function SignIn() {

    const [signInCredentials, setSignInCredentials] = useState({
        username: '',
        password: ''
    })

    const [err, setErr] = useState({
        username: '',
        password: ''
    })

    const handleSignIn = async () => {
        try {
            const response = await axios.post(
                links.serverName + '/sign-in',
                signInCredentials,
                { withCredentials: true, }
            )
            console.log(response.data)
        } catch (error) {
            console.error('Error signing in:', error.response)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            username: signInCredentials.username.trim() ? "" : "Required",
            password: signInCredentials.password.trim() ? "" : "Required",
        };

        setErr(errors);

        if (errors.username || errors.password) return
        else
            handleSignIn()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={signInCredentials.username}
                onChange={(e) => {
                    setSignInCredentials((prev) => ({
                        ...prev,
                        username: e.target.value
                    }))
                    setErr((prev) => ({
                        ...prev,
                        username: e.target.value.trim() ? "" : "Required",
                    }));
                }}
                err={err.username}
            />
            <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={signInCredentials.password}
                onChange={(e) => {
                    setSignInCredentials((prev) => ({
                        ...prev,
                        password: e.target.value
                    }))
                    setErr((prev) => ({
                        ...prev,
                        password: e.target.value.trim() ? "" : "Required",
                    }));
                }}
                err={err.password}
            />
            <div className="space-y-3 capitalize">
                <span className=" block text-sm text-primary underline">Forget username or password?</span>

                <Button
                    type="submit"
                    label="Sign in"
                    className="bg-success"
                />
            </div>
        </form>
    )
}
