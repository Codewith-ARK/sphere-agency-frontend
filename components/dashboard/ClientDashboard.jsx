import React from 'react'
import Campaign from '../campaign/Campaign';
import EmptyContainer from '../skeleton/EmptyContainer';

export default function ClientDashboard({ data }) {
    const { campaigns } = data;
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg font-bold'>Campaigns ({campaigns?.length || 0})</h1>
            {
                campaigns?.length > 0
                    ? campaigns?.map((item, idx) => (
                        <Campaign campaignData={item} key={idx} />
                    ))
                    : <EmptyContainer />
            }
        </div>
    )
}
