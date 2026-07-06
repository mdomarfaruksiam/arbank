import React, { useState } from 'react'
import BalanceCard from './BalanceCard'

export default function Dashboard() {

    const [isLoading, setLoading] = useState(false)

    const options = ['SAVINGS', 'FDR/DPS', 'LOAN']

    const [activeTab, setActiveTab] = useState(options[0])

    const [accountStatus, setAccountStatus] = useState({
        account: 'current savings account',
        accountNumber: '125869',
        active: true,
        balance: '5000',
        lastPaymentHistory: {
            lastPayment: '100',
            lastPaymentDate: '10/02/2025',
            lastPaymentBy: 'Mokhlesur rahman'
        }
    })

    const handleAccountStatus = (item) => {
        setActiveTab(item);
        setLoading(true)
        if (item === options[0]) {
            setAccountStatus({
                account: 'current savings account',
                accountNumber: '125869',
                active: true,
                balance: '5000',
                lastPaymentHistory: {
                    lastPayment: '100',
                    lastPaymentDate: '10/02/2025',
                    lastPaymentBy: 'Mokhlesur rahman'
                }
            })
        } else if (item === options[1]) {
            setAccountStatus({
                account: 'FDR/DPS account',
                accountNumber: '125869',
                active: true,
                balance: '5000',
                lastPaymentHistory: {
                    lastPayment: '100',
                    lastPaymentDate: '10/02/2025',
                    lastPaymentBy: 'Mokhlesur rahman'
                }
            })
        } else if (item === options[2]) {
            setAccountStatus({
                account: 'Loan account',
                accountNumber: '125869',
                active: true,
                balance: '5000',
                lastPaymentHistory: {
                    lastPayment: '100',
                    lastPaymentDate: '10/02/2025',
                    lastPaymentBy: 'Mokhlesur rahman'
                }
            })
        }
        setLoading(false)
    }

    return (
        <main className='m-4'>
            <div className='text-center mb-4 overflow-x-auto'>
                <ul className="flex p-4 gap-4 text-center">
                    {options.map((item, key) => (
                        <li
                            key={key}
                            onClick={() => handleAccountStatus(item)}
                            className={`px-2 py-2 rounded-lg font-medium shadow-md cursor-pointer transition-colors ${activeTab === item
                                ? "bg-muted text-surface"
                                : "bg-surface hover:bg-surface/10"}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <BalanceCard accountStatus={accountStatus} isLoading={isLoading} />
        </main>
    )
}
