'use client'
import Campaign from '@/components/campaign/Campaign';
import CampaignTask from '@/components/campaign/CampaignTask';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import TextWithLabel from '@/components/ui/TextWithLabel';
import axiosClient from '@/lib/axiosClient'
import Avatar from 'boring-avatars';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get(`/user/${id}/`);
            setUserData(data);
            console.log(data);
        }

        fetch();
    }, [])

    if (!userData) return <LoadingScreen />

    return (
        <section className='flex flex-col gap-6'>
            <div className='flex justify-center items-center'>
                <Avatar name={`${userData.first_name} ${userData.last_name}`} size={"128"} variant='beam' />
            </div>
            <div className='grid grid-cols-4'>
                <TextWithLabel label={"First name"} text={userData.first_name} />
                <TextWithLabel label={"Last name"} text={userData.last_name} />
                <TextWithLabel label={"Email"} text={userData.email} />
                <TextWithLabel label={"Role"} text={userData.role} />
            </div>
            {userData?.employee_profile && <EmployeeProfile data={userData.employee_profile} />}
            {userData.role == 'client' && <ClientProfile data={userData}/>}
        </section>
    )
}

function ClientProfile({ data }) {
    const { campaigns } = data;
    return (
        <section className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Campaigns ({campaigns.length || 0})</h2>
            {campaigns?.map(item => <Campaign campaignData={item} key={item.id} />)}
        </section>
    )
}

function EmployeeProfile({ data }) {
    const { tasks, skills } = data;
    return (
        <div className='flex flex-col gap-6'>
            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-medium'>Skills ({skills.split(',').length})</h2>
                <div className='p-4 border rounded-md space-x-4'>
                    {skills.split(',').map((item, idx) => {
                        if (item === "") ""
                        return <span key={idx} className='badge badge-accent badge-lg rounded-full justify-center'>{item}</span>
                    })}
                </div>
            </section>

            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-medium'>Tasks ({tasks.length})</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {tasks.map(item => <CampaignTask taskData={item} key={item.id} />)}
                </div>
            </section>
        </div>
    )
}