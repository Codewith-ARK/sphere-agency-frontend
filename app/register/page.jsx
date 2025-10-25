'use client';
import SelectInputField from '@/components/form/SelectInputField';
import InputField from '@/components/InputField'
import axiosClient from '@/lib/axiosClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner';

export default function Page() {
    const methods = useForm();
    const router = useRouter();
    const { handleSubmit, reset } = methods;

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const roleOptions = [
        { value: 'client', label: 'Client' },
        { value: 'employee', label: 'Employee' },
        { value: 'admin', label: "Admin" },
        { value: 'superadmin', label: 'Super Admin' },
        { value: 'agency_owner', label: 'Agency Owner' }
    ]

    async function onSubmit(data) {
        setLoading(true);
        try {

            let res = axiosClient.post('/user/new/', data);
            toast.promise(res,
                {
                    loading: 'Submitting...',
                    success: 'Registration Successful',
                    error: 'Error.'
                }
            )
            reset()
            res = await res;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className=''>
            <FormProvider {...methods}>
                <form className='min-h-screen mx-auto flex flex-col justify-center gap-2 max-w-sm' onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center'>
                        <h2 className='text-3xl font-bold'>Register</h2>
                        <p className='text-gray-400'>Create a new account</p>
                    </div>
                    <InputField
                        label={"First Name"}
                        name={"first_name"}
                        isRequired={true}
                    />
                    <InputField
                        label={"Last Name"}
                        name={'last_name'}
                        isRequired={true}
                    />
                    <InputField
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        isRequired={true}
                    />
                    <InputField
                        label={"Password"}
                        name={'password'}
                        type={showPass ? 'text' : 'password'}
                        isRequired={true}
                    />
                    <label className="label cursor-pointer w-full justify-between">
                        <span className="label-text">Show Password</span>
                        <input onChange={() => setShowPass(prev => !prev)} type="checkbox" className="checkbox" defaultChecked={showPass} />
                    </label>
                    <SelectInputField
                        label={"Role"}
                        name={'role'}
                        options={roleOptions}
                        isRequired={true}
                    />
                    <button disabled={loading} type="submit" className='btn btn-primary w-full rounded-full'>
                        {
                            loading
                                ? (<span className='loading loading-spinner'></span>)
                                : "Register"
                        }
                    </button>
                    <Link href={"/login"} className='btn btn-outline btn-primary w-full rounded-full'>Login</Link>
                </form>
            </FormProvider>
        </div>
    )
}
