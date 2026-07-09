import React from 'react'

export default function Footer() {
    return (
        <footer className='bg-secondary text-white'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-2'>
                <ul className='flex items-center gap-6 mt-4 md:mt-0 text-sm md:text-[16px]'>
                    <li className='hover:text-primary transition'>
                        Privacy Policy
                    </li>

                    <li className='hover:text-primary transition'>
                        Terms & Conditions
                    </li>

                    <li className='hover:text-primary transition'>
                        Contact
                    </li>
                </ul>

                <p className='text-white text-center capitalize'>
                    © {new Date().getFullYear()} ARBank. All rights reserved. <br />
                    <span className='text-xs'>developer gmail- m.omarfaruksiam@gmail.com</span>
                </p>
            </div>
        </footer >
    )
}