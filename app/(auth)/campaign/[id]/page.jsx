'use client'
import Campaign from '@/components/campaign/Campaign';
import CampaignTask from '@/components/campaign/CampaignTask';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [projectProgress, setProgress] = useState(0);

    useEffect(() => {
        async function fetch() {
            const { data } = await axiosClient.get(`/campaign/${id}/`)
            console.log(data);
            setCampaign(data);
        }
        fetch();
    }, [])

    useEffect(() => {
        function calc() {
            if (!campaign?.tasks?.length) {
                setProgress(0);
                return;
            }

            const completedTask = campaign.tasks.filter(
                (item) => item.status === "completed"
            ).length;

            setProgress(Math.ceil(completedTask / campaign.tasks.length * 100));
        }

        calc();
    }, [campaign]);



    if (!campaign) return <LoadingScreen />

    return (
        <div>
            <Campaign campaignData={campaign} />
            {
                campaign.status == 'rejected' 
                ? (
                    <div className='space-y-4'>
                        <h2 className='text-lg font-bold'>Rejection Reason</h2>
                        <div className='p-4 rounded-md border border-error bg-red-100 text-error'>
                            {campaign.notes || "N/A"}
                        </div>
                    </div>
                )
                : (
                    <>
                        <section className='my-6'>
                            <h2 className='text-2xl font-bold mb-6'>Progress ({`${projectProgress}%`})</h2>
                            <progress className="progress progress-success" value={projectProgress} max={100}></progress>
                        </section>
                        <section>
                            <h2 className='text-2xl font-bold mb-6'>Tasks ({`${campaign.tasks.length}`})</h2>
                            <div className='grid grid-cols-3 gap-4'>
                                {campaign?.tasks.map((item, idx) => <CampaignTask taskData={item} key={idx} />)}
                            </div>
                        </section>
                    </>
                )
            }
        </div>
    )
}
