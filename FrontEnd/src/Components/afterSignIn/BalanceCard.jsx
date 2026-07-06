import React from 'react'
import { FaRegCircleDot } from "react-icons/fa6";

export default function BalanceCard() {
    return (
        <div className='bg-surface shadow-md rounded capitalize'>
            <div className='flex justify-between border-b border-border p-2'>
                <div>
                    <h1 className='font-semibold text-xl text-success'>Current saving account</h1>
                    <span className='text-sm text-muted'>4125355542258</span>
                </div>
                <div className='font-medium text-secondary flex items-center gap-2'>
                    <FaRegCircleDot /> <span>active</span>
                </div>
            </div>
            <div className='p-2 py-5 text-center flex flex-col gap-2'>
                <span className='text-md m-auto text-muted font-medium'>Available balance</span>
                <span className='font-semibold text-success text-lg'>
                    500 <span className='text-xs'>BDT</span>
                </span>
            </div>
            <div className='pt-4 px-2 py-2 text-sm text-muted font-medium flex justify-between flex-wrap'>
                <span>last payment: 5000 <span className='text-[8px]'>BDT</span></span>
                <span>pay date: <span className='text-xs'>10/02/2026</span></span>
                <span>By: <span className='text-xs'>Mokhles</span></span>
            </div>
            <div className='text-lg font-bold text-primary p-2 border-t border-border'>
                ARBank
            </div>
        </div>
    )
}
