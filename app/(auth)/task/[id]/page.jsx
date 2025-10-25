'use client'
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import StatusBadge from '@/components/ui/StatusBadge';
import TextWithLabel from '@/components/ui/TextWithLabel';
import axiosClient from '@/lib/axiosClient';
import useUserStore from '@/store/userStore';
import { MessageCircle } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function TaskPage() {
    const [task, setTask] = useState(null);
    const { id } = useParams();
    const { user } = useUserStore();

    const statusSteps = ["pending", "to_do", "in_progress", "completed"];

    useEffect(() => {
        async function fetch() {
            try {
                const { data } = await axiosClient.get(`/task/${id}/`);
                setTask(data);
            } catch (err) {
                toast.error("Failed to load task");
            }
        }
        fetch();
    }, [id]);

    async function updateStatus(status) {
        try {
            let promise = axiosClient.patch(`/task/${id}/update/`, { status });
            toast.promise(promise, {
                loading: 'Updating...',
                success: 'Status updated',
                error: 'Error updating status',
            });
            const { data } = await promise;
            setTask(data);
        } catch (err) {
            console.error(err);
        }
    }

    if (!task) return <LoadingScreen />;

    const currentStep = statusSteps.indexOf(task.status);
    const assignee = task['assigned_to'];
    const { title, objective, status, notes, hours_required, priority, assigned_to } = task;
    const assigneeDetails = {
        name: `${assigned_to.first_name} ${assigned_to.last_name}`,
        email: assigned_to.email,
    }
    return (
        <div className="flex flex-col gap-6">
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <StatusBadge status={status} />
            </div>
            <p className='md:w-[680px]'>{objective}</p>
            <div className='py-4'>
                <h4 className='font-medium text-gray-400'>Assigned to</h4>
                {
                    assigned_to
                        ? (
                            <section className='mt-3 p-4 bg-base-300 rounded-md flex gap-3 items-center justify-between'>
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                        <span className="text-md">{assigneeDetails.name[0]}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm font-medium'>{assigneeDetails.name}</p>
                                    <p className='text-xs text-gray-400'>{assigneeDetails.email}</p>
                                </div>
                                <button disabled={true} className='ml-auto btn btn-circle btn-primary'><MessageCircle size={18} /></button>
                            </section>
                        )
                        : (<div className='p-4 bg-red-200 text-red-500 flex flex-col gap-3'>No assignee found.</div>)
                }
            </div>
            <div className='flex flex-col md:flex-row gap-4 divide-x divide-gray-300'>
                <TextWithLabel label={'Hours Required'} text={hours_required} />
                <TextWithLabel label={'Priority'} text={priority} />
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold">Task Progress</h2>
                <div className='flex flex-col gap-3'>
                    {statusSteps.map((step, idx) => (
                        <label key={step} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={idx <= currentStep}
                                disabled={true} // disable *all* checkboxes
                                onChange={() => updateStatus(step)}
                                className={`checkbox ${idx === currentStep ? "checkbox-primary" : "checkbox-success"}`}
                            />
                            <span className={`capitalize ${idx === currentStep ? "font-bold text-primary" : ""}`}>
                                {step.replace("_", " ")}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* For moving forward only */}
            {task.assigned_to == user.email && currentStep < statusSteps.length - 1 && (
                <div className='flex justify-end'>
                    <button
                        onClick={() => updateStatus(statusSteps[currentStep + 1])}
                        className="btn btn-primary rounded-full mt-4"
                    >
                        Update to: {statusSteps[currentStep + 1].replace("_", " ")}
                    </button>
                </div>
            )}
        </div>
    );
}
