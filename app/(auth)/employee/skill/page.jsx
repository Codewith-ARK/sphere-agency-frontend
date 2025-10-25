'use client'
import InputField from '@/components/InputField';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import useUserStore from '@/store/userStore';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {

    const [skills, setSkills] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useUserStore(state => state.user);

    const methods = useForm();
    const { handleSubmit, formState: { errors }, register, reset } = methods;

    useEffect(() => {
        if (!user?.id) return;
        fetchSkills();
    }, [user?.id])

    async function fetchSkills() {
        setLoading(true);
        const { data } = await axiosClient.get(`/user/${user?.id}/skill/`);
        // console.log(JSON.parse(data.employee_profile.skills));
        setSkills(data.employee_profile.skills);
        console.log(data);
        setLoading(false);
    }

    async function onSubmit(data) {
        let res = axiosClient.patch(`/user/${user?.id}/skill/update/`, data);
        toast.promise(res, {
            loading: 'Loading...',
            success: 'Success',
            error: 'Error!'
        });
        res = await res;
        console.log(res);
        setSkills(res.data.skills)
        reset();
    }

    function onError() {
        console.log(errors);
    }

    if (loading && !skills) return <LoadingScreen />

    return (
        <>
            <section>
                <h1>Add a Skill</h1>
                <FormProvider {...methods}>
                    <form className='flex flex-col items-end gap-3' onSubmit={handleSubmit(onSubmit, onError)}>
                        <InputField
                            label={"Add Skill (comma separated)"}
                            name={"skills"}
                            placeholder={"Skills"}
                            type={"text"}
                            rules={{required:"Skills can't be empty"}}
                        />
                        <button className='btn btn-success rounded-full' type='submit'>Add Skills <Plus size={16} /></button>
                    </form>
                </FormProvider>
            </section>
            <section className='my-6'>
                <h1>Your Skills</h1>
                <div className='my-4 border border-gray-300 rounded-md py-6 px-4 space-x-4'>
                    {skills?.split(',')?.map((item, idx) => {
                        if (item !== "") return <span key={idx} className='badge badge-soft badge-lg'>{item}</span>
                    })}
                </div>
            </section>
        </>
    )

}
