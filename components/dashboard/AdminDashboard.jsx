import React from 'react'
import Campaign from '../campaign/Campaign';
import EmptyContainer from '../skeleton/EmptyContainer';
import CampaignTask from '../campaign/CampaignTask';

export default function AdminDashboard({ data }) {
    const { tasks, campaigns } = data;
    return (
        <div className='flex flex-col gap-6'>
            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>Campaigns ({campaigns ? campaigns.length : 0})</h2>
                {
                    campaigns.length > 0
                        ? (
                            <div className='flex flex-col gap-3'>
                                {campaigns.map((item, idx) => <Campaign campaignData={item} key={idx} />)}
                            </div>
                        )
                        : <EmptyContainer text={"No campaigns here..."} />
                }
            </section>

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

        </div>
    )
}
