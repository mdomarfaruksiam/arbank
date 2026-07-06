import React from 'react'

export default function Button({
    label,
    type = 'button',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition ${className}`}
            {...props}
        >
            {label}
        </button>
    )
}