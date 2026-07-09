import React, { useState } from 'react'
import Input from '../../../Utils/Input'
import Button from '../../../Utils/Button'

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Savings from './Savings';
import FDR from './FDR';
import DPS from './DPS';
import Loan from './Loan';
import Profit from './Profit';


export default function AddBalance() {
    const options = ['SAVINGS', 'FDR', 'DPS', 'LOAN', 'PROFIT']

    const [openForm, setOpenForm] = useState(0)

    return (
        <main className='m-4'>
            <div className='bg-surface rounded-md overflow-hidden'>

                <div className='bg-surface'>
                    {options.map((option, index) => (
                        <>
                            <div
                                onClick={() => setOpenForm(openForm === index ? -1 : index)}
                                className='flex justify-between items-center border-b border-border p-2 text-xl font-bold text-info'>
                                <h1>{option}</h1>
                                <Button
                                    label={openForm === index ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    className='flex justify-center items-center max-w-10 max-h-8 bg-none'
                                />
                            </div>
                            {index === 0 && <Savings openForm={openForm} />}
                            {index === 1 && <FDR openForm={openForm} />}
                            {index === 2 && <DPS openForm={openForm} />}
                            {index === 3 && <Loan openForm={openForm} />}
                            {index === 4 && <Profit openForm={openForm} />}
                        </>
                    ))}
                </div>
            </div>
        </main>
    )
}
