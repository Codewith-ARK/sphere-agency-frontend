'use client'
import CampaignTask from '@/components/campaign/CampaignTask';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import EmptyContainer from '@/components/skeleton/EmptyContainer';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import useUserStore from '@/store/userStore';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [dashboard, setDashboard] = useState(null);
    const { user } = useUserStore();

    useEffect(() => {
        async function fetch() {
            try {

                const { data } = await axiosClient.get('/user/dashboard/');
                setDashboard(data);
                console.log(dashboard);
            } catch (err) {
                console.error(err);
            }
        }

        fetch();
    }, [])

    if (!dashboard) return <LoadingScreen />

    return (
        <div className='flex flex-col gap-6'>
            <section>
                {user?.role == 'client' && <ClientDashboard data={dashboard} />}
                {user?.role == 'employee' && <EmployeeDashboard data={dashboard} />}
                {user?.role.includes('admin', 'superadmin') && <AdminDashboard data={dashboard} />}
            </section>
        </div>
    )
}
