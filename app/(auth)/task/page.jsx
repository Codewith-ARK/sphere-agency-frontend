'use client'
import CampaignTask from '@/components/campaign/CampaignTask';
import EmptyContainer from '@/components/skeleton/EmptyContainer';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get("/task/");
            setTasks(data);
        }

        fetch()
    }, [])

    if (!tasks) return <LoadingScreen text={"Loading Tasks..."}/>

    return (
        <section className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Tasks ({tasks ? tasks.length : 0})</h2>
            {
                tasks.length > 0
                    ? (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {tasks.map((item, idx) => <CampaignTask taskData={item} key={idx} />)}
                        </div>
                    )
                    : <EmptyContainer text={"No tasks here..."} />
            }
        </section>
    )
}
