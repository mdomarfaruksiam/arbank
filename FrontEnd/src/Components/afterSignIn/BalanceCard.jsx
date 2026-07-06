import React from 'react'
import { FaRegCircleDot } from "react-icons/fa6";
import Loading from '../Loading';

export default function BalanceCard({ accountStatus, isLoading }) {
    return (
        <div className='bg-surface shadow-md rounded capitalize'>
            {isLoading ? <Loading fullScreen={false} /> :
                <>
                    <div className='flex justify-between border-b border-border p-2'>
                        <div>
                            <h1 className='font-semibold text-xl text-success'>
                                {accountStatus.account}
                            </h1>
                            <span className='text-sm text-muted'>{accountStatus.accountNumber}</span>
                        </div>
                        <div className={`font-medium ${accountStatus.active ? 'text-accent' : 'text-warning'} flex items-center gap-2`}>
                            <FaRegCircleDot /> <span>{accountStatus.active ? 'active' : 'unactive'}</span>
                        </div>
                    </div>
                    <div className='p-2 py-5 text-center flex flex-col gap-2'>
                        <span className='text-md m-auto text-muted font-medium'>Available balance</span>
                        <span className='font-semibold text-success text-lg'>
                            {accountStatus.balance} <span className='text-xs'>BDT</span>
                        </span>
                    </div>

                    {accountStatus.lastPaymentHistory &&
                        <div className='pt-4 px-2 py-2 text-sm text-muted font-medium flex justify-between flex-wrap'>
                            <span>
                                last payment:
                                {accountStatus.lastPaymentHistory.lastPayment} <span className='text-[8px]'>BDT</span>
                            </span>

                            <span>
                                pay date:
                                <span className='text-xs'>
                                    {accountStatus.lastPaymentHistory.lastPaymentDate}
                                </span>
                            </span>

                            <span>
                                By:
                                <span className='text-xs'>
                                    {accountStatus.lastPaymentHistory.lastPaymentBy}
                                </span>
                            </span>
                        </div>}
                    <div className='text-lg font-bold text-primary p-2 border-t border-border'>
                        ARBank
                    </div>
                </>}
        </div>
    )
}
