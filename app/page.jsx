'use client'
import InputField from '@/components/InputField'
import axiosClient from '@/lib/axiosClient';
import useUserStore from '@/store/userStore';
import { LucideSparkles } from 'lucide-react';
import { LucideArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner';

export default function page() {
    const [quote, setQuote] = useState(null);
    const [campaignData, setCampaignData] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useUserStore();
    const router = useRouter();
    const fieldNames = [
        { label: 'Title', value: campaignData?.title },
        { label: 'Type', value: campaignData?.type },
        { label: 'Platform', value: campaignData?.platform },
        // 'Duration',
    ]
    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("tempData"));
        if (data) {
            setCampaignData(data.campaignData);
            setQuote(data.quote);
        }
    }, [])

    async function onSubmit(data) {
        setLoading(true)
        setCampaignData(data);
        try {
            let promise = axiosClient.post('/campaign/new/quote/', data);
            toast.promise(
                promise,
                {
                    loading: 'Generating budget...',
                    error: 'Error generating budget',
                    success: 'Budget Generated.'
                }
            )
            promise = await promise;
            setQuote(promise.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function onError() {
        console.log(errors)
        toast.error("Invalid form.");
    }

    async function submitCampaign() {
        if (!user) {
            localStorage.setItem("tempData", JSON.stringify({ campaignData, quote }))
            router.push("/login?source=newCampaign");
            return;
        }
        try {
            let response = axiosClient.post('/campaign/new/', { ...campaignData, quote })
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
    return (
        <section className='pt-20 gap-10 flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold'>Create a Campaign</h1>
            <div className='flex flex-col justify-center items-center'>
                <FormProvider {...methods}>
                    <section className='grid grid-cols-2'>
                        <form className='flex flex-col gap-3 max-w-md' onSubmit={handleSubmit(onSubmit, onError)}>
                            {
                                fieldNames.map((item, index) => <InputField
                                    name={item.label.toLowerCase()}
                                    label={item.label}
                                    type={'text'}
                                    key={index}
                                    rules={{ required: "This field is required" }}
                                />)
                            }
                            <InputField
                                name={"duration"}
                                label={"Duration (in days)"}
                                type={'number'}
                                rules={{ required: "This field is required" }}
                            />
                            <button disabled={loading} type="submit" className='btn btn-primary rounded-full'>
                                {loading
                                    ? <span className='loading loading-spinner'></span>
                                    : (<><LucideSparkles size={16} /> Generate</>)

                                }
                            </button>
                        </form>

                        <div className='h-full grow w-[580px] bg-base-300 border border-base-100 px-4 py-6 rounded-md flex flex-col justify-between'>
                            <div className='grow'>
                                <h2 className='text-xl font-medium mb-6'>Proposed Quote</h2>
                                <div className='grow h-[80%] flex justify-center items-center'>
                                    {
                                        quote &&
                                        <p className='text-6xl'>Rs. {parseFloat(quote).toLocaleString()}</p>
                                    }
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={submitCampaign} disabled={!quote} className='btn btn-soft rounded-full'>Submit Campaign <LucideArrowRight size={16} /></button>
                            </div>
                        </div>
                    </section>
                </FormProvider>
            </div>
        </section>

    )
}
