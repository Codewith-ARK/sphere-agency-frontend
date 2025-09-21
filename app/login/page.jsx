'use client'
import InputField from '@/components/InputField'
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function page() {
    const { login } = useUserStore();
    const params = useSearchParams();
    const source = params.get("source");
    console.log(source)
    const router = useRouter();
    const [showPass, setShowPass] = useState(true);

    const methods = useForm();
    const { handleSubmit, formState: { errors }, register } = methods;

    async function onSubmit(data) {
        const response = await login(data);

        if (response.status === 200 && source === 'newCampaign') {
            toast.success("Login successful");
            router.push('/')
        } else if (response.status === 200) {
            toast.success("Login successful");
            router.push('/dashboard')
        }
        else {
            toast.error("Login failed");
            console.error(response);
        }
    }

    function onError() {
        console.log(errors);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className='mx-auto max-w-xs h-screen flex justify-center items-center flex-col gap-3'>
                <InputField
                    label={"Email"}
                    type={"email"}
                    name={'email'}
                />

                <InputField
                    label={"Password"}
                    type={showPass ? 'text' : 'password'}
                    name={'password'}
                />
                <button type="submit" className='btn btn-primary w-full rounded-full'>Login</button>
                <Link href={"/register"} className='btn btn-outline btn-primary w-full rounded-full'>Register</Link>
            </form>
        </FormProvider>
    )
}
