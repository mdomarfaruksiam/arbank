import React from 'react'

export default function MiniStatement({ payemtHistories }) {
    return (

        <div className='bg-border mt-4 rounded-md capitalize overflow-hidden'>
            <h1 className='font-semibold p-2'>
                Mini Statement: <span className='text-accent font-bold'>SAVINGS</span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2 w-full'>
                {payemtHistories.map((payemtHistory, index) => (
                    <div key={index} className='bg-surface p-2 border-b border-border flex gap-2 rounded-md'>
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
                                {payemtHistory.time.date}
                                <br />
                                <span className='text-xs font-medium'>
                                    {payemtHistory.time.year}
                                </span>
                            </span>
                            <div />
                        </div>
                        <div className='w-full font-semibold'>
                            <div>{payemtHistory.title}</div>
                            <div className={`${payemtHistory.amount > 0 ? 'text-primary' : 'text-error'} text-right sm:text-left`}>
                                {payemtHistory.amount} <span className='text-xs'>BDT</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
