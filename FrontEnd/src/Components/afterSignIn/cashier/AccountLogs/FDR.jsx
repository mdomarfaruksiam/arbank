import React, { useState } from 'react'
import Input from '../../../../Utils/Input'
import Button from '../../../../Utils/Button'

export default function FDR({ index, openSection, account = {} }) {
    const options = [1, 2, 3, 4]
    const [showOptions, setShowOptions] = useState(false)

    const [fdr, setFdr] = useState({
        username: account?.username || '',
        amount: '',
        depositorName: '',
        transactionType: '',
        note: '',
        entryDate: account?.date || '',
    })

    const handleInputChange = (key, value) => {
        setFdr((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting fdr Data Form: ", fdr)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-all
            ${openSection === index
                    ? "max-h-150 p-4 gap-4 duration-500"
                    : "max-h-0 p-0 gap-0 overflow-hidden duration-300"}`} >

            <Input
                label='Amount'
                placeholder='Enter amount'
                value={fdr.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
            />

            <div className="relative">
                <Input
                    label='Tenor'
                    placeholder='Enter tenor'
                    value={fdr.transactionType}
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
                                    {option} year
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Input
                label='Special note'
                placeholder='Enter note'
                value={fdr.note}
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