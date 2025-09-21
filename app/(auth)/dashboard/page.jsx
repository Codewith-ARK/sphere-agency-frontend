'use client'
import CampaignTask from '@/components/campaign/CampaignTask';
import EmptyContainer from '@/components/skeleton/EmptyContainer';
import LoadingScreen from '@/components/skeleton/LoadingScreen';
import axiosClient from '@/lib/axiosClient'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    async function fetch() {
      const { data } = await axiosClient.get('/user/dashboard/');
      setDashboard(data);
      console.log(dashboard);
    }

    fetch();
  }, [])

  if (!dashboard) return <LoadingScreen />

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Tasks</h1>
      {
        dashboard?.tasks?.length > 0
          ? dashboard?.tasks.map((item, idx) => <CampaignTask key={idx} taskData={item} />)
          : <EmptyContainer />
      }
    </div>
  )
}
