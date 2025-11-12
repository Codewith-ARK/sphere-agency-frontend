'use client'
import EmptyContainer from '@/components/skeleton/EmptyContainer';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import TextWithLabel from '@/components/ui/TextWithLabel';
import axiosClient from '@/lib/axiosClient'
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [allUser, setAllUser] = useState(null);

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get('/user/all/');
            setAllUser(data);
            console.log(data);
        }

        fetch()
    }, [])

    const fieldLabels = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Email', value: 'email' },
        { label: 'Role', value: 'role' },
        // {label: 'First Name', value: 'first_name'},
    ]

    if (!allUser) return <LoadingScreen />
    if (allUser.length < 0) return <EmptyContainer text={"No users found..."} />

    return (
        <div>
            {/* <div className='grid grid-cols-5 text-lg font-bold gap-3'> */}
            <table className='table table-zebra'>
                <thead>
                    <td className=''>First Name</td>
                    <td className=''>Last Name</td>
                    <td className=''>Email</td>
                    <td className=''>Role</td>
                    <td className=''>Action</td>
                </thead>
                <tbody>
                    {allUser.map((item, idx) => <User data={item} key={idx} />)}
                </tbody>
            </table>
            {/* </div> */}
        </div>
    )
}

function User({ data }) {
    return (
        // <div className='py-3 grid grid-cols-5 gap-3'>
        <tr className='hover:bg-base-300'>
            <td className=''>{data.first_name || ""}</td>
            <td className=''>{data.last_name || ""}</td>
            <td className=''>{data.email || ""}</td>
            <td className=''>{data.role}</td>
            <td className='flex gap-3'>
                <Link href={`/admin/users/${data.id}`} className='btn btn-sm btn-info btn-outline rounded-full'>View <Search size={12} /></Link>
            </td>
        </tr>
        // </div>
    )
}