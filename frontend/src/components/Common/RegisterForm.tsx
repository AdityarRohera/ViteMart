'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { registerUser } from '@/services/operations/auth'



function RegisterForm({role} : any) {

    const [formData , setFormData] = useState({name : "" , email : "" , password : "" , confirmPassword : "" ,  role : `${role}`})
    const [loading , setLoading] = useState(false);
    const router = useRouter();

    const changeHandler = (e : any) => {
        const {name , value} = e.target;
        setFormData((prev : any) => {
            return {
                ...prev , [name] : value
            }
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true)
      await registerUser({ toast, router ,  ...formData });
      setLoading(false);
      setFormData({name : "" , email : "" , password : "" , confirmPassword : "" ,  role : `${role}`})
    };


  return (
    <div className='w-full'>

      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-5'>

        {/* Name */}
        <Input
        className='w-full h-12'
        type='text'
        name="name"
        value={formData.name}
        onChange={changeHandler}
        placeholder='Enter your name'
        />

        {/* email */}
        <Input
        className='w-full h-12'
        type='text'
        name="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder='Enter your email'
        />

        {/* password */}
        <Input
        className='w-full h-12'
        type='text'
        name="password"
        value={formData.password}
        onChange={changeHandler}
        placeholder='Enter your password'
        />

        {/* confirm password */}
        <Input
        className='w-full h-12'
        type='text'
        name="confirmPassword"
        onChange={changeHandler}
        placeholder='confirm your password'
        />

        <button type='submit' className='w-full rounded-xl text-2xl bg-orange-600 hover:bg-orange-400 text-white items-center shadow p-2'>{loading ? "...loading" : "Register"}</button>

        <Toaster/>
      </form>

    </div>
  )
}

export default RegisterForm
