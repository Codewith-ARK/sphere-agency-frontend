import React from 'react'

export default function TextWithLabel({ label, text, className }) {
    return (
        <div className='pe-4'>
            <p className='text-xs text-gray-400'>{label}</p>
            <p className={`text-justify ${className || ""}`}>{text}</p>
        </div>
    )
}
