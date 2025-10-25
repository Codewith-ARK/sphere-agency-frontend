'use client'
import Campaign from '@/components/campaign/Campaign';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

export default function Page() {

    const [campaign, setCampaign] = useState(null);
    const { register, watch, formState: { errors } } = useForm({
        defaultValues: {
            query: ''
        }
    });

    const query = watch('query')

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get('/campaign/all/');
            setCampaign(data);
            console.log(data);
        }
        fetch();
    }, [])

    if (!campaign) return <LoadingScreen />

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-2xl font-bold'>Campaigns ({campaign.length > 0 ? campaign.length : 0})</h1>
            <section className='flex justify-end mb-6'>
                <label className="select">
                    <span className="label">Filter</span>
                    <select {...register('query')}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="generating">Generating</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </label>
            </section>
            <div className='flex flex-col gap-4'>
                {campaign
                    .filter(item => (!query || item.status == query.toLowerCase()))
                    .map((item, idx) => <Campaign campaignData={item} key={idx} />)}
            </div>
        </div>
    )
}
