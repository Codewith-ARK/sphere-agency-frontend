'use client'
import Campaign from '@/components/campaign/Campaign';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [campaign, setCampaign] = useState(null);
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
        <div className='flex flex-col gap-4'>
            {campaign.map((item, idx) => <Campaign campaignData={item} key={idx} />)}
        </div>
    )
}
