import React from 'react'

export default function LoadingScreen({text}) {
  return (
    <div className='skeleton h-screen flex justify-center items-center'>
      <p className='animate-pulse md:text-2xl font-medium '>{text || "Loading..."}</p>
    </div>
  )
}
