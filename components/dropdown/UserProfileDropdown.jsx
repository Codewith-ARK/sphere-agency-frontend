import React from 'react'
import Avatar from '../ui/Avatar'
import useUserStore from '@/store/userStore'
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function UserProfileDropdown() {
    const user = useUserStore(state => state.user);
    return (
        <div className="dropdown dropdown-end">
            <button className='flex gap-2 items-center'>
                <div className='transition-discrete text-right'>
                    <p className='text-xs'>Welcome back,</p>
                    <h4>{`${user?.first_name} ${user?.last_name}`}</h4>
                </div>
                <Avatar firstName={user?.first_name[0]} />
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-1 w-40 p-2 shadow-sm border border-base-100">
                <li><Link href={`/user/profile/`} className='text-base-content'>View profile</Link></li>
                <li></li>
                <li><Link href={`/logout`} className='text-error'><LogOut size={14} /> Logout</Link></li>
            </ul>
        </div>
    )
}
