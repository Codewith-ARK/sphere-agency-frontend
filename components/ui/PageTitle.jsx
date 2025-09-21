import React from 'react'

export default function PageTitle({text}) {
    return (
        <h1 className='text-3xl font-medium border-b border-b-gray-300 dark:border-b-gray-700'>
            {text}
        </h1>
    )
}
