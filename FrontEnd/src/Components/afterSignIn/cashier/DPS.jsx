import React, { useState } from 'react'
import Input from '../../../Utils/Input'
import Button from '../../../Utils/Button'


export default function DPS({ openForm }) {
    return (
        <form className={`transition-h duration-500 overflow-hidden ${openForm === 2 ? 'space-y-6 p-4 max-h-120' : 'max-h-0'}`}>
            <div className='grid md:grid-cols-2 gap-4'>
                <Input
                    label={'Account name'}
                    placeholder={'Enter account name'}
                />
                <Input
                    label={'Amount'}
                    placeholder={'Enter amount'}
                />
                <Input
                    label={'Date'}
                    placeholder={'10-12-2026'}
                    type={'datetime-local'}
                />
            </div>
            <Button
                label={'Submit'}
                className='bg-accent text-border' />
        </form>
    )
}
