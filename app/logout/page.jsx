'use client';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import useUserStore from '@/store/userStore'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {

    const { logout } = useUserStore();
    const router = useRouter();

    setTimeout(()=>{
        logout()
        router.push('/')
    },3000)

    return (
        <div className='h-screen'>
            <LoadingScreen text={"Logging out..."} />
        </div>
    )
}
