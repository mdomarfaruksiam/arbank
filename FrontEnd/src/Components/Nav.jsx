import React from 'react'

export default function Nav() {
    return (
        <header className='bg-surface/50'>
            <nav className='container mx-auto'>
                <div className='flex justify-between'>
                    <h1>OurBank</h1>
                    <div className='flex items-center'>
                        <ul className='flex gap-2 justify-center items-center'>
                            <li>home</li>
                            <li>home</li>
                            <li>home</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
