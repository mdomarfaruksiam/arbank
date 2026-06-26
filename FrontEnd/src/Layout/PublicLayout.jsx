import React from 'react'
import { Outlet } from 'react-router'

import Nav from '../Components/Nav'
import Footer from '../Components/Footer'

export default function PublicLayout() {
    return (
        <div className='min-h-dvh flex flex-col justify-between'>
            <Outlet />
            <Footer />
        </div>
    )
}
