import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

import Input from '../Utils/Input';
import Button from '../Utils/Button';
import links from '../Essentials/links';

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1);

    const [userCredentials, setUserCredentials] = useState({
        username: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [credentialErrors, setCredentialErrors] = useState({
        username: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (step === 1) {
            if (!userCredentials.username) {
                setCredentialErrors((prev) => ({
                    ...prev,
                    username: "Please enter your username or email"
                }))
            } else {
                //verifing the username or email
                try {
                    const response = await axios.post(
                        links.serverName + '/forget-password',
                        { ...userCredentials, step },
                        { withCredentials: true, }
                    )
                    if (response.data.success == 2) {
                        setStep(2)
                    } else if (response.data.success == 1) {
                        toast.warning(`username or email didn't mathed`)
                        setCredentialErrors((prev) => ({
                            ...prev,
                            username: `username or email didn't mathed`
                        }))
                    }
                    toast.success(response.data.message)
                } catch (error) {
                    console.log(error)
                    toast.error(error?.response?.data.message || "Somthing happend wrong")
                }
            }

        } else if (step === 2) {
            if (!userCredentials.otp) {
                setCredentialErrors((prev) => ({
                    ...prev,
                    otp: "Please enter the OTP"
                }))
            } else {
                setStep(step + 1)
                toast.success('in the step 2')
            }
            setLoading(false)


        } else if (step === 3) {
            if (!userCredentials.newPassword) {
                setCredentialErrors((prev) => ({
                    ...prev,
                    newPassword: "Please enter your new password"
                }))
                setLoading(false)


            } else if (!userCredentials.confirmPassword) {
                setCredentialErrors((prev) => ({
                    ...prev,
                    confirmPassword: "Please confirm your new password"
                }))
                setLoading(false)


            } else if (userCredentials.newPassword !== userCredentials.confirmPassword) {
                setCredentialErrors((prev) => ({
                    ...prev,
                    confirmPassword: "Passwords do not match"
                }))
                setLoading(false)


            } else {
                setStep(step + 1)
                toast.success('in the step 3')
            }
        }
        setLoading(false)
    }

    const setCredential = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setCredentialErrors((prev) => ({
                ...prev,
                [name]: `Please enter your ${name}`
            }))
        } else {
            setCredentialErrors((prev) => ({
                ...prev,
                [name]: ''
            }))
        }
        setUserCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <main className="container m-auto flex items-center justify-center px-4">
            <section className="w-full my-2 max-w-md rounded-2xl bg-surface p-6 shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold text-primary">
                        ARBank
                    </h1>

                    <p>
                        Reset your password with few easy steps.
                    </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {step !== 3 ? <>
                        <Input
                            placeholder="Username or email"
                            type="text"
                            name="username"
                            value={userCredentials.username}
                            onChange={setCredential}
                            err={credentialErrors.username}
                        />
                        {step === 2 && (
                            <Input
                                placeholder="OTP"
                                type="text"
                                name="otp"
                                value={userCredentials.otp}
                                onChange={setCredential}
                                err={credentialErrors.otp}
                            />
                        )}
                    </> : <>
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
                    }
                    <Button label={`${loading ? 'Wait...' : 'Submit'}`} type="submit" text="Submit" />
                </form>
            </section>
        </main>
    )
}
