import React from 'react'
import { useFormContext, get } from 'react-hook-form'

export default function InputField({ name, label, type, placeholder, className, isRequired, rules }) {

    const { register, formState: { errors } } = useFormContext();
    const error = get(errors, name);

    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">{label}{isRequired && <p className='text-error'>*</p>}</legend>
            <input
                type={type}
                className={`input w-full ${className}`}
                placeholder={placeholder}
                {...register(name, { required: isRequired ? 'This field is required' : false, ...rules })}
            />
            {error && <p className="text-error text-xs mt-1">{error.message}</p>}
        </fieldset>
    )
}