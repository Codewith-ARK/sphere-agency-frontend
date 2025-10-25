import React from 'react'
import CampaignTask from '../campaign/CampaignTask'

export default function TaskSection({tasks}) {
    return (
        <section>
            <h2 className='text-2xl font-bold mb-6'>Tasks ({`${tasks.length}`})</h2>
            <div className='grid grid-cols-3 gap-4'>
                {tasks.map((item, idx) => <CampaignTask taskData={item} key={idx} />)}
            </div>
        </section>
    )
}
