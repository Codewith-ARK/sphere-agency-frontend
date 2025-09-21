import { LucideX } from 'lucide-react'
import { LucideCheck } from 'lucide-react'
import React, { useState } from 'react'
import TextWithLabel from '../ui/TextWithLabel'
import { toast } from 'sonner';
import axios from 'axios';
import axiosClient from '@/lib/axiosClient';
import Link from 'next/link';
import { LucideArrowRight } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import StatusBadge from '../ui/StatusBadge';
import useUserStore from '@/store/userStore';

export default function Campaign({ campaignData }) {
    const {
        id, title, platform, budget, start_date, end_date, duration, type, created_at
    } = campaignData;

    const [status, setStatus] = useState(campaignData.status);
    const [loading, setLoading] = useState(false);
    const { user } = useUserStore();

    const fieldLabels = [
        { label: 'Type', value: type || 'N/A' },
        { label: 'Platform', value: platform || 'N/A' },
        { label: 'Budget', value: budget ? `Rs. ${budget?.toLocaleString()}` : 'N/A' },
        { label: 'Status', value: status || 'N/A' },
        { label: 'Start Date', value: start_date || 'N/A' },
        { label: 'End Date', value: end_date || 'N/A' },
        { label: 'Duration (in Days)', value: duration || 'N/A' },
    ];

    function formatDate(rawDate) {
        dayjs.extend(relativeTime);
        return dayjs(rawDate).fromNow();
    }


    return (
        <div className='border px-4 py-6 rounded-md space-y-4'>
            <div className='flex justify-between'>
                <h2>{title}</h2>
                <div className='flex gap-3'>
                    <p className='text-xs opacity-40'>{formatDate(created_at)}</p>
                    {/* <span className='badge badge-sm badge-soft'>{status}</span> */}
                    <StatusBadge status={status} />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {
                    fieldLabels.map((item, idx) => <TextWithLabel label={item.label} text={item.value} key={idx} />)
                }
            </div>
            {

            }
            {
                status === "pending" && user.role.includes('admin', 'superadmin')
                    ? (
                        <CampaignApproval id={id} setStatus={setStatus} />
                    )
                    : (
                        <div className='flex justify-end'>
                            <Link href={`/campaign/${id}`} className='btn btn-soft rounded-full'>View campaign <LucideArrowRight size={16} /></Link>
                        </div >
                    )
            }
        </div >
    )
}

function CampaignApproval({ id, setStatus }) {

    const [loading, setLoading] = useState(false);

    async function updateStatus(action, payload) {
        setLoading(true);
        try {

            let response = axiosClient.patch(`/campaign/${id}/update/`, { "action": action, 'notes': payload });
            toast.promise(response, {
                loading: "Updating status...",
                success: 'Status updated',
                error: 'Error updating status'
            })
            response = await response;
            console.log(response.data.status)
            setStatus(response.data.status);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleReject() {
        const reason = prompt("Enter rejection reason.");
        updateStatus("rejected", reason);
    }

    return (
        <div className='flex justify-end gap-4'>
            <button disabled={loading} onClick={() => updateStatus("approved")} className='btn btn-success rounded-full items-center'>Approve <LucideCheck size={16} /></button>
            <button disabled={loading} onClick={() => handleReject()} className='btn btn-error rounded-full items-center'>Reject <LucideX size={16} /></button>
        </div>
    )
}