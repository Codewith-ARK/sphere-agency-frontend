'use client'
import InputField from '@/components/InputField'
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
  return (
    <Suspense fallback={<div className='h-screen skeleton'></div>}>
      <Login />
    </Suspense>
  )
}


function Login() {
    const { login, loading, error } = useUserStore();
    const params = useSearchParams();
    const source = params.get("source");
    const router = useRouter();
    const [showPass, setShowPass] = useState(true);

    const methods = useForm();
    const { handleSubmit, formState: { errors }, register } = methods;

    async function onSubmit(data) {
        const response = await login(data);

        if (response?.status === 200 && source === 'newCampaign') {
            toast.success("Login successful");
            router.push('/')
        } else if (response?.status === 200) {
            toast.success("Login successful");
            router.push('/dashboard')
        } else {
            toast.error("Login failed");
            console.error(response);
        }
    }

    function onError() {
        console.log(errors);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className='mx-auto max-w-xs min-h-screen flex justify-center items-center flex-col gap-3'>
                <h2 className='text-3xl font-bold'>Login</h2>
                <p className='text-gray-400'>Log in to your account</p>
                <InputField
                    label={"Email"}
                    type={"email"}
                    name={'email'}
                    placeholder={'example@email.com'}
                    isRequired={true}
                />

                <InputField
                    label={"Password"}
                    type={showPass ? 'text' : 'password'}
                    name={'password'}
                    placeholder={'Password'}
                    isRequired={true}
                />
                <label className="label cursor-pointer w-full justify-between">
                    <span className="label-text">Show Password</span>
                    <input onChange={() => setShowPass(prev => !prev)} type="checkbox" className="checkbox" defaultChecked={showPass}/>
                </label>
                <button disabled={loading} type="submit" className='btn btn-primary w-full rounded-full'>
                    {
                        loading 
                        ? (<span className='loading loading-spinner'></span>)
                        : "Login"
                    }
                </button>
                <Link href={"/register"} className='btn btn-outline btn-primary w-full rounded-full'>Register</Link>
            </form>
        </FormProvider>
    )
}
