import React, { useContext, useEffect } from 'react'

import axios from 'axios'
import links from '../Essentials/links'
import { useNavigate } from 'react-router'
import { authContext } from '../Context'
import Loading from '../Components/Loading'

export default function SignOut() {
    const { setUserCredentials } = useContext(authContext)
    const navigate = useNavigate()
    useEffect(() => {
        const handleSignOut = async () => {
            try {
                await axios.post(
                    links.serverName + '/sign-out',
                    {},
                    {
                        withCredentials: true,
                    }
                )
                console.log('Sign-out successful')
                setUserCredentials(false)
                navigate('/')
            } catch (error) {
                console.error('Error signing out:', error)
            }
        }
        handleSignOut()
    }, [])
    return <Loading text='Signing out' />
}
