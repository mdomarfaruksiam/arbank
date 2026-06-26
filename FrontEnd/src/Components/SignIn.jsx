import React, { useState } from "react";


import Input from "../Utils/Input";
import Button from "../Utils/Button";

export default function SignIn() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const [err, setErr] = useState({
        username: '',
        password: ''
    })
    return (
        <form className="space-y-5">
            <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => {
                    setCredentials((prev) => ({
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
                placeholder="Enter your username"
                value={credentials.password}
                onChange={(e) => {
                    setCredentials((prev) => ({
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
                    label="Sign in"
                    className="bg-success"
                    onClick={() => alert(credentials.username + ' ' + credentials.password)}
                />
            </div>
        </form>
    )
}
