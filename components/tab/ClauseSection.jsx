import React, { useState } from 'react'
import TextWithLabel from '../ui/TextWithLabel'
import { Sparkles } from 'lucide-react';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'sonner';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import GenerateContractButton from '../contract/ContractPDFTemplate';

export default function ClauseSection({ contractData }) {

    const [loading, setLoading] = useState(false);
    const [clauses, setClauses] = useState(contractData?.clauses || null);
    const { id } = useParams();
    const { user } = useUserStore();

    async function generateContract() {
        try {
            setLoading(true);
            let res = axiosClient.post(`/campaign/${id}/generate/`);
            toast.promise(res, {
                loading: 'Generating...',
                success: 'Contract generated',
                error: 'Error.'
            })
            res = await res;
            setClauses(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-end'>
                <GenerateContractButton props={contractData} />
            </div>
            {
                user.role.includes('admin', 'superadmin') && !clauses &&
                <div className='flex justify-end'>
                    <button disabled={loading} onClick={generateContract} className='btn btn-primary btn-sm rounded-full'><Sparkles size={12} /> Generate Contract</button>
                </div>
            }
            {clauses?.map((item, idx) => (
                <div key={idx} className='py-6 px-4 flex flex-col gap-3 border rounded-md'>
                    <TextWithLabel className={"text-xl font-bold"} label={"Title"} text={item.title} />
                    <TextWithLabel label={"Text"} text={item.text} />
                    <TextWithLabel label={"Explanation"} text={item.explanation} />
                </div>
            ))}
        </div>
    )
}
