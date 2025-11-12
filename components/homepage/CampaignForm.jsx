import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import InputField from '../InputField';
import { LucideSparkles } from 'lucide-react';
import SelectInputField from '../form/SelectInputField';
import { adTypeOptions, platformOptions } from '@/data/options';
import { toast } from 'sonner';
import { motion } from 'motion/react';

function CampaignFormHeader() {
    const { user } = useUserStore();
    return (
        <header>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold uppercase text-primary'>Generate Quote</h1>
                <p className='text-gray-400'>Enter details to generate quotation for a new campaign.</p>
                {
                    !user &&
                    <p className='badge badge-error text-red-800 text-xs mt-4'>Account required to submit a campaign.</p>
                }
            </div>
        </header>
    )
}


export default function CampaignForm({ submitHandler }) {
    const { register, handleSubmit, formState: { errors } } = useFormContext();
    const [loading, setLoading] = useState(false);

    function onError() {
        console.error(errors)
        toast.error("Invalid form.");
    }

    function onSubmit(params) {
        console.log(params);
        try {
            setLoading(true);
            submitHandler(params);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                    y: 0,
                    opacity: 100, 
                    transition: {duration: 0.6,}
                 }}
            >
                <CampaignFormHeader />
            </motion.div>
            <main className='px-4 py-6 min-w-sm'>
                <form className='flex flex-col max-w-md gap-3' onSubmit={handleSubmit(onSubmit, onError)}>
                    <InputField
                        name={'title'}
                        label={"Campaign title"}
                        isRequired={true}
                    />
                    <SelectInputField
                        name={'type'}
                        label={"Campaign Type"}
                        isRequired={true}
                        options={adTypeOptions}
                    />
                    <SelectInputField
                        name={'platform'}
                        label={"Target Platform"}
                        isRequired={true}
                        options={platformOptions}
                    />
                    <InputField
                        name={'duration'}
                        label={"Campaign Duration (Days)"}
                        isRequired={true}
                        type={'number'}
                        rules={{ min: { value: 1, message: 'Invalid campaign duration' } }}
                    />

                    <button disabled={loading} type="submit" className='btn btn-primary rounded-full'>
                        {loading
                            ? <span className='loading loading-spinner'></span>
                            : (<><LucideSparkles size={16} /> Generate</>)

                        }
                    </button>
                </form>
            </main>
        </>
    )
}
