'use client';
import useUserStore from '@/store/userStore';
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function CreateCampaignButton() {
    const pathname = usePathname();
    const {user} = useUserStore();

    if (pathname === "/") return null;
    else if (pathname.includes('/login', '/register')) return null;
    else if (user?.role !== 'client') return null;

    return (
        <Link href={"/"} className='btn btn-primary rounded-full fixed right-6 bottom-10'>
            <Plus size={16} />
            Create Campaign
        </Link>
    )
}
