'use client'
import React from 'react'
import useUserStore from '@/store/userStore'
import UserProfileDropdown from '../dropdown/UserProfileDropdown'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { SidebarToggle } from './Sidebar'
import { ArrowRight } from 'lucide-react'

export default function Navbar({ heading }) {
  const user = useUserStore(state => state.user);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const pathname = usePathname();
  const links = pathname
    .split('/')
    .filter(Boolean)
    .map(link => link.charAt(0).toUpperCase() + link.slice(1));

  return (
    <div className='border-b border-b-gray-300 dark:border-b-gray-700 sticky top-0 bg-base-200/40 backdrop-blur-xl flex justify-between items-center py-2 px-4 z-50 shadow-lg'>
      <SidebarToggle />
    <div className="hidden md:block breadcrumbs text-sm">
        <ul>
          {links.map((item, index) => {
            // Build the URL by joining all segments up to current index
            const url = '/' + links
              .slice(0, index + 1)
              .map(link => link.toLowerCase())
              .join('/');
            
            return (
              <li key={index}>
                <Link href={url} className="hover:text-primary">
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex gap-3 items-baseline'>
        {
          isAuthenticated
            ? <UserProfileDropdown />
            : <Link href={"/login"} className='btn btn-primary rounded-full'>Login <ArrowRight size={16}/></Link>
        }
      </div>
    </div>
  )
}
