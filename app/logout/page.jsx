'use client';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import useUserStore from '@/store/userStore'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {

    const { logout } = useUserStore();
    const router = useRouter();

    setTimeout(()=>{
        logout()
        localStorage.removeItem('user-storage');
        router.push('/')
    },2000)

    return (
        <div className='h-screen'>
            <LoadingScreen text={"Logging out..."} />
        </div>
    )
}
