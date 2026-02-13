
'use client'

import React from 'react'

function ToggleButton({role , setRole} : any) {
  return (
    <div className='border border-gray-50 bg-gray-200 flex justify-evenly items-center p-2 rounded-3xl text-xl mb-6'>
            <button className={`rounded-xl text-2xl bg-gray-50 text-black items-center shadow p-1 cursor-pointer ${role==='Buyer' ? 'bg-orange-500 text-white' : ''}`} onClick={() => setRole('Buyer')}>Buyers</button>
            <button className={`rounded-xl text-2xl bg-gray-50 text-black items-center shadow p-1 cursor-pointer ${role==='Vendor' ? 'bg-orange-500 text-white' : ''}`}  onClick={() => setRole('Vendor')}>Vendors</button>
            <button className={`rounded-xl text-2xl bg-gray-50 text-black items-center shadow p-1 cursor-pointer ${role==='Admin' ? 'bg-orange-500 text-white' : ''}`}  onClick={() => setRole('Admin')}>Admin</button>
    </div>
  )
}

export default ToggleButton
