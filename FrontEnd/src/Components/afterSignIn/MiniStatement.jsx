import React from 'react'

export default function MiniStatement() {
    return (

        <div className='bg-surface p-2 border-b border-border flex gap-2 rounded-md'>
            <div className='bg-bg w-15 h-15 flex flex-col items-center justify-between font-bold rounded-lg overflow-hidden'>
                <div className='bg-info h-[20%] w-full flex justify-around'>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                    <div className='h-[50%] w-[2%] bg-bg'></div>
                </div>
                <span className='text-sm text-center'>
                    02-06
                    <br />
                    <span className='text-xs font-medium'>
                        2026
                    </span>
                </span>
                <div />
            </div>
            <div className='w-full font-semibold'>
                <div>FDR/DPS installment</div>
                <div className='text-error text-right sm:text-left'>
                    -500 <span className='text-xs'>BDT</span>
                </div>
            </div>
        </div>
    )
}
