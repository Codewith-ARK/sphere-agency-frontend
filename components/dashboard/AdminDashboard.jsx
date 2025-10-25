import React from 'react'
import Campaign from '../campaign/Campaign';
import EmptyContainer from '../skeleton/EmptyContainer';
import CampaignTask from '../campaign/CampaignTask';
import { ArrowRight } from 'lucide-react';

export default function AdminDashboard({ data }) {
    const { tasks, campaigns, count } = data;
    return (
        <div className='flex flex-col gap-6'>
            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>Campaigns</h2>
                {
                    count?.campaigns.length > 0
                        ? (
                            <div className='stats bg-base-100 shadow border border-gray-200'>
                                {
                                    count.campaigns.map((item, idx) => (
                                        <div className='stat' key={idx}>
                                            <p className='stat-title'>{item.status.toUpperCase()}</p>
                                            <p className='stat-value'>{item.total}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        : <EmptyContainer />
                }
                {/* {
                    campaigns.length > 0
                        ? (
                            <div className='flex flex-col gap-3'>
                                {campaigns.map((item, idx) => <Campaign campaignData={item} key={idx} />)}
                            </div>
                        )
                        : <EmptyContainer text={"No campaigns here..."} />
                } */}
            </section>

            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>Tasks</h2>
                {
                    count?.tasks.length > 0
                        ? (
                            <div className='stats bg-base-100 shadow border border-gray-200'>
                                {
                                    count.tasks.map((item, idx) => (
                                        <div className='stat' key={idx}>
                                            <p className='stat-title'>{item.status.toUpperCase()}</p>
                                            <p className='stat-value'>{item.total}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        : <EmptyContainer />
                }

                {/* {
                    tasks?.length > 0
                        ? (
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {tasks.map((item, idx) => <CampaignTask taskData={item} key={idx} />)}
                            </div>
                        )
                        : <EmptyContainer text={"No tasks here..."} />
                } */}
            </section>

        </div>
    )
}
