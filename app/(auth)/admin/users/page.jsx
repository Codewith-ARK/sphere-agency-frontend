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
            <div className='grid grid-cols-5 text-lg font-bold'>
                <h2>First Name</h2>
                <h2>Last Name</h2>
                <h2>Email</h2>
                <h2>Role</h2>
                <h2>Action</h2>
            </div>
            {allUser.map((item, idx) => <User data={item} key={idx} />)}
        </div>
    )
}

function User({ data }) {
    return (
        <div className='py-3 grid grid-cols-5'>
            <p>{data.first_name}</p>
            <p>{data.last_name}</p>
            <p>{data.email}</p>
            <p>{data.role}</p>
            <div className='flex gap-3'>
                <Link href={`/admin/users/${data.id}`} className='btn btn-sm btn-info btn-outline rounded-full'>View <Search size={12} /></Link>
            </div>
        </div>
    )
}