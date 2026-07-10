import React from 'react'

export default function Loan({ index, openSection, account = {} }) {
    return (
        <form
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-all
            ${openSection === index
                    ? "max-h-150 p-4 gap-4 duration-500"
                    : "max-h-0 p-0 gap-0 overflow-hidden duration-300"}`} >
            FDR
        </form>
    )
}
