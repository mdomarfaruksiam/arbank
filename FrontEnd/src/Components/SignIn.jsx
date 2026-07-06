import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'


import { authContext } from '../Context'
import Input from '../Utils/Input'
import Button from '../Utils/Button'
import Loading from './Loading'

import links from '../Essentials/links'
import { useContext } from 'react'

export default function SignIn() {

    const { setUserCredentials } = useContext(authContext)

    const [loading, setLoading] = useState(false)

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
            toast.success(response.data.message)
            setUserCredentials({
                isLoggedIn: true,
                user: response.data.user
            })
        } catch (error) {
            console.error('Error signing in:', error.response)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const errors = {
            username: signInCredentials.username.trim() ? '' : 'Required',
            password: signInCredentials.password.trim() ? '' : 'Required',
        }

        setErr(errors)

        if (errors.username || errors.password) return
        else
            handleSignIn()
    }

    return (
        <>
            {loading ? <Loading /> : <form onSubmit={handleSubmit} className='space-y-5'>
                <Input
                    label='Username'
                    id='username'
                    type='text'
                    placeholder='Enter your username'
                    value={signInCredentials.username}
                    onChange={(e) => {
                        setSignInCredentials((prev) => ({
                            ...prev,
                            username: e.target.value
                        }))
                        setErr((prev) => ({
                            ...prev,
                            username: e.target.value.trim() ? '' : 'Required',
                        }))
                    }}
                    err={err.username}
                />
                <Input
                    label='Password'
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    value={signInCredentials.password}
                    onChange={(e) => {
                        setSignInCredentials((prev) => ({
                            ...prev,
                            password: e.target.value
                        }))
                        setErr((prev) => ({
                            ...prev,
                            password: e.target.value.trim() ? '' : 'Required',
                        }))
                    }}
                    err={err.password}
                />
                <div className='space-y-3 capitalize'>
                    <Link className='block text-sm text-primary underline' to='/forget-password'>Forget username or password?</Link>

                    <Button
                        type='submit'
                        label='Sign in'
                        className='bg-success'
                    />
                </div>
            </form>
            }</>
    )
}
