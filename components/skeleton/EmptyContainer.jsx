import { CircleDashed } from 'lucide-react'
import React from 'react'

export default function EmptyContainer({ text }) {
    return (
        <div className={`h-screen bg-gray-200 gap-3 flex flex-col justify-center items-center rounded-md`}>
            <CircleDashed size={24} className='text-gray-500' />
            <p className='text-gray-500'>{text || "There's nothing here..."}</p>
        </div>
    )
}
