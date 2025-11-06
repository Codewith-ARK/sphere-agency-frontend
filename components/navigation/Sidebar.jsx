'use client'
import { User } from 'lucide-react'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'
import { Menu } from 'lucide-react'
import { BarChart } from 'lucide-react'
import { ChartColumnIncreasing } from 'lucide-react'
import useUserStore from '@/store/userStore'
import { FileChartColumn } from 'lucide-react'
import { ListCheck } from 'lucide-react'
import { BriefcaseBusiness } from 'lucide-react'
import { User2 } from 'lucide-react'
import { FileCheck2 } from 'lucide-react'
import { File } from 'lucide-react'
import { UserCog } from 'lucide-react'
import { UserCog2 } from 'lucide-react'

export default function Sidebar({ children }) {

    const { user } = useUserStore();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content relative flex flex-col">
                <Navbar />
                <div className='py-6 px-2 md:px-4'>
                    {children}
                </div>
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute">
                    <Menu size={18}/>
                </label> */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 border-r border-r-gray-300 dark:border-r-gray-700 text-base-content min-h-full w-80 p-4 justify-between">
                    <div>
                        <h1 className='text-2xl mb-12'>Sphere Agency</h1>
                        <li><Link href={"/dashboard"}><Home size={18} /> Dashboard</Link></li>
                        <li><Link href={"/campaign"}><File size={18} /> Campaigns</Link></li>
                        <li><Link className={""} href={"/task"}><ListCheck size={18} /> Tasks</Link></li>
                        {
                            user?.role === "employee" &&
                            (
                                <li><Link className={""} href={"/employee/skill/"}><FileCheck2 size={18} /> Skills</Link></li>
                            )
                        }
                        {
                            (user?.role == "admin" || user?.role == "superadmin") &&
                            (
                                <>
                                    <li><Link className={""} href={"/admin/users/"}><UserCog2 size={18} /> Manage Users</Link></li>
                                </>
                            )
                        }
                    </div>
                </ul>
            </div>
        </div>)
}

export function SidebarToggle() {
    return (
        <label htmlFor="my-drawer-2" className="relative right-4 btn btn-primary btn-square rounded-r-full drawer-button lg:hidden">
            <Menu size={18} />
        </label>
    )
}