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

    const assigneeDetails = {
        email: assigned_to.email,
        name: `${assigned_to.first_name} ${assigned_to.last_name}`
    }


    return (
        <div className='py-6 px-4 border rounded-xl'>
            <div className='flex justify-between mb-4'>
                <StatusBadge status={status} />
                <Link className='btn btn-soft btn-xs rounded-full mt-auto' href={`/task/${id}/`}>View details <LucideArrowRight size={16} /></Link>
            </div>
            <div className=''>
                <h4>Assigned to</h4>
                <section className='py-4 flex gap-3 items-center'>
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-8 rounded-full">
                            <span className="text-xs">UI</span>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm font-medium'>{assigneeDetails.name}</p>
                        <p className='text-xs text-gray-400'>{assigneeDetails.email}</p>
                    </div>
                </section>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    fieldLabels.map((item, idx) => <TextWithLabel label={item.label.toUpperCase()} text={item.value} key={idx} />)
                }
            </div>
        </div>
    )
}