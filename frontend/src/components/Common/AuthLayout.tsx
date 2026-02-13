'use client'

import React, { useState } from 'react'
import {ShoppingBag } from 'lucide-react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Link from 'next/link'
import ToggleButton from './ToggleButton'

function AuthLayout({authtype , header , subHeader} : any) {

    const [role , setRole] = useState<string>("Buyer");
    console.log("Role -> " , role)

  return (
    <div className='w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <div className='border border-gray-200 bg-gray-50 rounded-t-xl shadow w-[90%] h-full mt-20 flex flex-col items-center'>

        {/* auth nav */}
        <div className='border border-gray-200 bg-white shadow w-full h-15 flex justify-center items-center'>
            <Link href={'/'} className="flex items-center gap-2">
                <ShoppingBag className="text-indigo-600" size={28} />
                <span className="text-2xl font-bold text-indigo-600">
                Vibe<span className="text-orange-500">Mart</span>
                </span>
            </Link>
        </div>
        

        {/* form */}
        <div className='border border-gray-100 w-[45%] bg-white rounded-2xl shadow px-20 pb-10 mt-10'>

            <h2 className={`text-2xl font-bold text-center mb-2 ${authtype === 'Login' ? 'mt-10' : 'mt-5'}`}>
                {header}
            </h2>

            <p className="text-gray-500 text-center mb-6">
                {subHeader}
            </p>

             {/* Toggle Buttons */}
            <ToggleButton role={role} setRole={setRole}/>
            
            {
                authtype === 'Register' ? <RegisterForm role={role}/> : <LoginForm role={role}/>
            }

            {/* Divider */}
            <div className="flex items-center mt-3">
              <div className="grow h-px bg-gray-300 text-2xl"></div>
              <span className="px-3 text-gray-400 text-xl">or</span>
              <div className="grow h-px bg-gray-300 text-2xl"></div>
            </div>

           {/* Google Button */}
          <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition mt-3">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">
              Sign up with Google
            </span>
          </button>


          {/* Already have account or Not have account */}

          {
            authtype === "Register" &&
            <p className="text-center text-gray-500 mt-6 mb-6">
                Already have an account?{" "}
                <Link href={'/login'} className="text-indigo-600 font-medium cursor-pointer hover:underline">
                  Login
                </Link>
            </p>
          }

          {
            authtype === "Login" &&
            <p className="text-center text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link href={'/register'} className="text-indigo-600 font-medium cursor-pointer hover:underline">
                  Register
                </Link>
            </p>
          }

        </div>

      </div>
    </div>
  )
}

export default AuthLayout
