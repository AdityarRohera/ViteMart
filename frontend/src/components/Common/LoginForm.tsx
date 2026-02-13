'use client'
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast , {Toaster} from 'react-hot-toast';

import { loginUser } from '@/services/operations/auth';


function LoginForm({role} : any) {
  console.log(role)

      const [formData , setFormData] = useState({email : "" , password : "",  role : `${role}`})
      const [loading , setLoading] = useState(false);
      const router = useRouter();

      console.log(formData)
  
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

        setLoading(true);
        const status = await loginUser({ toast ,  ...formData});
        setLoading(false);

        if (!status) return;

        setFormData({ email : "" , password : "" ,  role : `${role}`})
        router.push('/dashboard');
        router.refresh();
      };

      useEffect(() => {
        setFormData((prev : any) => {
              return {
                  ...prev , role : `${role}`
              }
          })
      } , [role])

  return (
    <div className='w-full'>

      <form  onSubmit={handleSubmit} action="" className='flex flex-col gap-5'>

        {/* Name */}
        <Input
        className='w-full h-12'
        type='text'
        name="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder='Enter your email'
        />

        {/* Name */}
        <Input
        className='w-full h-12'
        type='text'
        name="password"
        value={formData.password}
        onChange={changeHandler}
        placeholder='Enter your password'
        />

        <button type='submit' className='w-full rounded-xl text-2xl bg-orange-600 hover:bg-orange-400 text-white items-center shadow p-2'>{loading ? "...Loading" : "Login"}</button>

      </form>

      <Toaster/>

    </div>
  )
}

export default LoginForm;

