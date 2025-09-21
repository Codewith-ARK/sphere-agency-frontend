import React from 'react'
import TextWithLabel from '../ui/TextWithLabel';
import Link from 'next/link';
import { LucideArrowRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function CampaignTask({ taskData }) {
    const {
        id,
        title,
        objective,
        priority,
        hours_required,
        status,
        notes,
        campaign,
        assigned_to,
    } = taskData

    const fieldLabels = [
        { label: 'title', value: title || 'N/A' },
        { label: 'priority', value: priority || 'N/A' },
        { label: 'Status', value: status || 'N/A' },
        { label: 'hours required', value: hours_required || 'N/A' },
        { label: 'objective', value: objective || 'N/A' },
        { label: 'notes', value: notes || 'N/A' },
    ];

    return (
        <div className='py-6 px-4 border rounded-xl'>
            <div className='flex justify-between mb-4'>
                <StatusBadge status={status}/>
                <Link className='btn btn-soft btn-xs rounded-full mt-auto' href={`/task/${id}/`}>View details <LucideArrowRight size={16} /></Link>
            </div>
            {
                fieldLabels.map((item, idx) => <TextWithLabel label={item.label} text={item.value} key={idx} />)
            }
        </div>
    )
}