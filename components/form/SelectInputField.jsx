import React from 'react'
import { get, useFormContext } from 'react-hook-form'

export default function SelectInputField({ label, name, options, className, isRequired, rules = {} }) {
    const { register, formState: { errors } } = useFormContext();
    const error = get(errors, name);

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}{isRequired && <span className='text-error'>*</span>}</legend>
            <select
                {...register(name, { required: isRequired ? 'This field is required' : false, ...rules })}
                className={`select w-full ${className || ''}${error && 'select-error' || ""}`}
            >
                {/* <option value="" disabled>Select an option</option> */}
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            {error && <p className="text-error text-xs mt-1">{error.message}</p>}
        </fieldset>
    )
}
