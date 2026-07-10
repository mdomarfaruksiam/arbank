import React, { useState } from 'react'
import Input from '../../../../Utils/Input'
import Button from '../../../../Utils/Button'

export default function Savings({ account = {} }) {
    const options = ['FDR', 'DPS', 'LOAN', 'WITHDRAWAL', 'PROFIT', 'LATEFEE']
    const [showOptions, setShowOptions] = useState(false)

    const [savings, setSavings] = useState({
        username: account?.username || '',
        amount: '',
        depositorName: '',
        transactionType: '',
        note: '',
        entryDate: account?.date || '',
    })

    const handleInputChange = (key, value) => {
        setSavings((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting Savings Data Form: ", savings)
    }

    return (
        <form onSubmit={handleSubmit} className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Input
                label='Amount'
                placeholder='Enter amount'
                value={savings.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
            />

            <Input
                label='Depositor Name'
                placeholder='Enter depositor name'
                value={savings.depositorName}
                onChange={(e) => handleInputChange('depositorName', e.target.value)}
            />

            <div className="relative">
                <Input
                    label='Transaction Type'
                    placeholder='Enter transaction type'
                    value={savings.transactionType}
                    onChange={(e) => handleInputChange('transactionType', e.target.value)}
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                />

                {showOptions && (
                    <div className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
                        <div className="max-h-60 overflow-y-auto">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className="w-full border-b border-border px-4 py-2 text-left hover:bg-border last:border-b-0 base-normal"
                                    onMouseDown={() => {
                                        handleInputChange('transactionType', option);
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
                label='Special note'
                placeholder='Enter note'
                value={savings.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
            />

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
                <Button
                    type='button'
                    className='bg-error text-bg px-6'
                    label={'Cancel'}
                />
                <Button
                    type='submit'
                    className='bg-accent text-bg px-6'
                    label={'Submit'}
                />
            </div>
        </form>
    )
}