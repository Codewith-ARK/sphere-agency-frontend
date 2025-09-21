'use client'
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function TaskPage() {
    const [task, setTask] = useState(null);
    const { id } = useParams();

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

    return (
        <div className="p-6">
            <section>
                <h2 className="text-lg font-semibold mb-4">Task Details</h2>

            </section>
            <h2 className="text-lg font-semibold mb-4">Task Progress</h2>
            <div className="flex gap-3">
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

            {/* For moving forward only */}
            {currentStep < statusSteps.length - 1 && (
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
