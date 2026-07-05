import React from 'react'
import { useContext } from 'react'

import { authContext } from '../Context'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router'

export default function PrivateLayout() {
    const { userCredentials } = useContext(authContext)
    return (
        <div className='min-h-dvh flex flex-col justify-between'>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}
