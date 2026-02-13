import AuthLayout from '@/components/Common/AuthLayout'
import React from 'react'

function page() {
  return (
    <div className='overflow-x-hidden'>
      <AuthLayout 
      authtype="Login"
      header="Welcome Back To VibeMart"
      subHeader="Login to continue start buying and selling on VibeMart"
      />
    </div>
  )
}

export default page
