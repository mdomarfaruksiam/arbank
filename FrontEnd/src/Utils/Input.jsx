import React from 'react'

export default function Input({
    label,
    id,
    type = 'text',
    placeholder,
    className = '',
    err,
    ...props
}) {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {label &&
                <label
                    htmlFor={id}
                    className='font-medium text-secondary text-sm md:text-[16px]'>
                    {label}
                </label>}

            <div className='flex flex-col space-y-0'>
                <input
                    id={id}
                    type={type}
                    {...props}
                    placeholder={placeholder}
                    className={`border border-border rounded-lg px-4 py-3 outline-none text-sm sm:text-[16px] ${className}`}
                />
                {err &&
                    <span
                        className='ml-auto text-xs text-warning'>
                        {err}
                    </span>}
            </div>
        </div>
    )
}