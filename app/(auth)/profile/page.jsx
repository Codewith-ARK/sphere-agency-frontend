'use client'
import Campaign from '@/components/campaign/Campaign';
import CampaignTask from '@/components/campaign/CampaignTask';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import TextWithLabel from '@/components/ui/TextWithLabel';
import axiosClient from '@/lib/axiosClient'
import useUserStore from '@/store/userStore';
import Avatar from 'boring-avatars';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [userData, setUserData] = useState(null);
    const { user } = useUserStore();

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get(`/user/${user?.id}/`);
            setUserData(data);
            console.log(data);
        }

        fetch();
    }, [user?.id])

    if (!userData) return <LoadingScreen />

    return (
        <section className='flex flex-col gap-6'>
            <div className='flex justify-center items-center'>
                <Avatar name={`${user?.first_name} ${user?.last_name}`} size={"128"} variant='beam' />
            </div>
            <div className='grid grid-cols-4'>
                <TextWithLabel label={"First name"} text={userData.first_name} />
                <TextWithLabel label={"Last name"} text={userData.last_name} />
                <TextWithLabel label={"Email"} text={userData.email} />
                <TextWithLabel label={"Role"} text={userData.role} />
            </div>
            {userData?.employee_profile && <EmployeeProfile data={userData.employee_profile} />}
            {/* {userData.role == 'client' && <ClientProfile data={userData} />} */}
        </section>
    )
}

function EmployeeProfile({ data }) {
    const { skills } = data;
    return (
        <div className='flex flex-col gap-6'>
            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-medium'>Skills ({skills?.split(',').length || 0})</h2>
                <div className='p-4 border rounded-md space-x-4'>
                    {skills
                    ?.split(',')
                    .map((item, idx) => {
                        if (item === "") ""
                        return <span key={idx} className='badge badge-accent badge-lg rounded-full justify-center'>{item}</span>
                    })}
                </div>
            </section>
        </div>
    )
}