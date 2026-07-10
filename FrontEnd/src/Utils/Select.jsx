import React from 'react';

export default function Select({
    label,
    id,
    options = [],
    placeholder = 'Select an option',
    className = '',
    err,
    required = false,
    ...props
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="font-medium text-secondary text-sm md:text-[16px]"
                >
                    {label}
                    {required && <span className="text-warning ml-1">*</span>}
                </label>
            )}

            <div className="flex flex-col">
                <select
                    id={id}
                    className={`border border-border rounded-lg px-4 py-3 outline-none text-sm sm:text-[16px] ${className}`}
                    {...props}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>

                    {options.map((option, index) => {
                        if (typeof option === 'string') {
                            return (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            );
                        }

                        return (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        );
                    })}
                </select>

                {err && (
                    <span className="ml-auto mt-1 text-xs text-warning">
                        {err}
                    </span>
                )}
            </div>
        </div>
    );
}