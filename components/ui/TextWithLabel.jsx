import React from 'react'

export default function TextWithLabel({ label, text }) {
    return (
        <div>
            <p className='text-xs opacity-60'>{label}</p>
            <p>{text}</p>
        </div>
    )
}
