import React from 'react'
import EmptyContainer from '../skeleton/EmptyContainer';
import CampaignTask from '../campaign/CampaignTask';

export default function EmployeeDashboard({ data }) {

    const { tasks } = data;

    return (
        <>
            <section className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Tasks ({tasks ? tasks.length : 0})</h1>
                {
                    tasks?.length > 0
                        ? (
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    tasks?.map((item, idx) => (
                                        <CampaignTask key={idx} taskData={item} />
                                    ))
                                }
                            </div>
                        )
                        : <EmptyContainer />
                }
            </section>
        </>
    )
}
