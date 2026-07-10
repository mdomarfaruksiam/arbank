import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import Savings from './Savings';
import Input from '../../../../Utils/Input';
import Select from '../../../../Utils/Select';


export default function AccountLogs() {
    const options = ['president', 'secretary', 'cashier', 'member']
    const [showOptions, setShowOptions] = useState(false)
    const [account, setAccount] = useState({
        username: '',
        date: '',
    })

    return (
        <main className='bg-border rounded-lg p-4 m-4 capitalize'>
            <form className='bg-surface mb-10 rounded-lg p-2'>
                <h1 className='font-bold text-xl text-accent mb-5'>Account details</h1>
                <div className='flex gap-4'>
                    <div className="grid sm:grid-cols-2 gap-4 w-full">
                        <div className="relative">
                            <Input
                                label="Account Name"
                                placeholder="Enter account name"
                                value={account.username}
                                onChange={(e) => {
                                    setAccount(prev => ({
                                        ...prev,
                                        username: e.target.value,
                                    }));
                                }}
                                onFocus={() => setShowOptions(true)}
                                onBlur={() => setShowOptions(false)}
                            />
                            {showOptions && (
                                <div className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
                                    <div className="max-h-60 overflow-y-auto">
                                        {options.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className="w-full border-b border-border px-4 py-2 text-left hover:bg-border last:border-b-0"
                                                onMouseDown={() => {
                                                    setAccount(prev => ({
                                                        ...prev,
                                                        username: option,
                                                    }));
                                                    setShowOptions(false);
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Input
                            label="Date"
                            type="datetime-local"
                        />
                    </div>
                    <div className='space-y-2 flex flex-col justify-center items-center'>
                        <img
                            className='max-w-25 max-h-25 rounded'
                            src="img1.jpeg"
                            alt="" />
                    </div>
                </div>
            </form>
            <ul className='grid gap-4'>
                <li className='bg-surface rounded-lg'>
                    <div className='flex justify-between items-center px-4 py-2 border-b border-border'>
                        <span
                            className='capitalize text-lg font-bold text-info'>Savigs account</span>
                        <span><IoIosArrowDown /></span>
                    </div>
                    <Savings account={account} />
                </li>
            </ul>
        </main>
    )
}
