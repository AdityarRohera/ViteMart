import React from 'react'

import { BuyerDashboard } from '@/components/Buyers/dashboard/BuyerDashboard'
import {VendorDashboard} from '@/components/Vendor/dashboard/VendorDashboard'
import { fetchUser } from '@/services/operations/auth'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function page() {

        const cookieStore = await cookies();
        const user = await fetchUser(cookieStore);
        console.log(user);
   
        if(!user){
             return redirect('/login');
        }

  return (
    <div>
      {
        user.role === 'Buyer' ? <BuyerDashboard user={user}/> : <VendorDashboard user={user}/>
      }
    </div>
    
  )
}
