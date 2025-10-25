'use client'
import axiosClient from '@/lib/axiosClient';
import useUserStore from '@/store/userStore';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import CampaignForm from '@/components/homepage/CampaignForm';
import CampaignQuote from '@/components/homepage/CampaignQuote';

export default function Page() {
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

    async function generateQuote(data) {
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

    async function submitCampaign(data) {
        if (!user) {
            localStorage.setItem("tempData", JSON.stringify({ campaignData, quote }))
            router.push("/login?source=newCampaign");
            return;
        }
        try {
            let response = axiosClient.post('/campaign/new/', { ...campaignData, 'budget': quote.finance_data.total_cost })
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
        <>
            <section className='px-4 md:px-20 lg:px-40 py-20 gap-10 flex flex-col items-center justify-center'>
                <div className='flex flex-col justify-center items-center'>
                    {
                        quote
                            ? <CampaignQuote props={{
                                submitHandler: submitCampaign,
                                quote: quote,
                                setQuote: setQuote,
                                campaignData: campaignData,
                                setCampaignData: setCampaignData,
                            }} />
                            : (
                                <FormProvider {...methods}>
                                    <CampaignForm submitHandler={generateQuote} />
                                </FormProvider>
                            )
                    }
                </div>
                {
                    !user &&
                    <Link className={"btn btn-primary btn-outline rounded-full fixed top-10 right-10"} href={"/login"}>Login/Signup <ArrowRight size={16} /></Link>
                }
            </section>
        </>
    )
}
