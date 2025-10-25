import useUserStore from '@/store/userStore';
import { Currency } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { LucideArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import TextWithLabel from '../ui/TextWithLabel';
import { NotebookPen } from 'lucide-react';
import { FileText } from 'lucide-react';

function CampaignQuoteHeader() {
    return (
        <header className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold uppercase text-primary'>Campaign Quote</h1>
            <p className='text-gray-400'>Our system's predicted justification and budget quotation.</p>
        </header>
    )
}

export default function CampaignQuote({ props }) {
    console.log(props)
    const { user } = useUserStore();
    const router = useRouter();
    const { quote, setQuote } = props;
    const { campaignData, setCampaignData } = props;

    async function submitCampaign() {
        if (!user) {
            localStorage.setItem("tempData", JSON.stringify({ campaignData, quote }))
            router.push("/login?source=newCampaign");
            return;
        }
        try {
            let response = axiosClient.post('/campaign/new/', { ...campaignData, 'budget': quote })
            toast.promise(response,
                {
                    loading: "Submitting campaign...",
                    success: "Campaign submitted",
                    error: 'Error submitting campaign.'
                }
            )
            response = await response;
            console.log(response);
            localStorage.removeItem("tempData");
            setCampaignData(null);
            setQuote(null);
            router.push("/dashboard");
        } catch (e) {
            console.error(e);
        }
    }
    const { justification, finance_data } = quote;
    const {
        hourly_rate,
        total_cost,
        estimated_hours,
        advance_payment,
        advance_percent,
        remaining_balance
    } = finance_data

    return (
        <main className='space-y-6'>
            <CampaignQuoteHeader />
            <section className='border border-gray-300 flex flex-col gap-6 bg-base-300 px-4 py-6 rounded-md w-full'>
                <div className='flex gap-3 items-center'>
                    <FileText size={28} className='text-primary' />
                    <h1 className='text-2xl font-medium'>Campaign Info</h1>
                </div>
                <div className='flex flex-wrap gap-3 divide-x divide-gray-300'>
                    <TextWithLabel label={'Title'} text={campaignData.title}/>
                    <TextWithLabel label={'Duration (Days)'} text={campaignData.duration}/>
                    <TextWithLabel label={'Platform'} text={campaignData.platform}/>
                    <TextWithLabel label={'Type'} text={campaignData.type}/>
                </div>
            </section>
            <section className='border border-gray-300 flex flex-col gap-6 bg-base-300 px-4 py-6 rounded-md w-full'>
                <div className='flex gap-3 items-center'>
                    <DollarSign size={28} className='text-primary' />
                    <h1 className='text-2xl font-medium'>Finance Data</h1>
                </div>
                <div className='flex flex-col gap-6'>
                    <div>
                        <span className='text-sm uppercase text-gray-400'>Total Cost</span>
                        <h2 className='text-primary text-5xl font-bold'>{`Rs. ${total_cost.toLocaleString()}/-`}</h2>
                    </div>
                    <div className='flex gap-3 divide-x divide-gray-300'>
                        <TextWithLabel label={'Hourly Rate'} text={`Rs. ${hourly_rate}`} />
                        <TextWithLabel label={'Estimated Hours'} text={`${estimated_hours} Hours`} />
                    </div>
                    <div className='flex gap-3 divide-x divide-gray-300'>
                        <TextWithLabel label={'Advance Payment %'} text={`${advance_percent}%`} />
                        <TextWithLabel label={'Advance Payment'} text={`Rs. ${advance_payment.toLocaleString()}`} />
                        <TextWithLabel label={'Remaining Balance'} text={`Rs. ${remaining_balance.toLocaleString()}`} />
                    </div>
                </div>
            </section>
            <section className='border border-gray-300 flex flex-col gap-6 bg-base-300 px-4 py-6 rounded-md w-full'>
                <div className='flex gap-3 items-center'>
                    <NotebookPen size={28} className='text-primary' />
                    <h1 className='text-2xl font-medium'>Justification</h1>
                </div>
                <div className='text-gray-700'>
                    {justification}
                </div>
            </section>
            <section className='space-x-4 flex justify-end'>
                <button onClick={() => print()} className='btn'>Print</button>
                <button onClick={() => setQuote(null)} className='btn btn-outline'>Try Again</button>
                <button onClick={props.submitHandler} className='btn btn-primary'>Submit Campaign</button>
            </section>
        </main>
    )
}
