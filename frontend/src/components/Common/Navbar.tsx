'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'
import { logout } from '@/services/operations/auth'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useUser } from '@/context/UserProvider'

export default function Navbar() {
   const [open, setOpen] = useState(false);
   const router = useRouter()
   const pathname = usePathname();
   const {user , setUser} = useUser();

  // console.log("context user -> " , user);

  const logoutHandler = async() => {
    await logout();
    setUser(null);
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={28} />
          <span className="text-2xl font-bold text-indigo-600">
            Vibe<span className="text-orange-500">Mart</span>
          </span>
        </Link>

        {/* Desktop Routes */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href={`${user ? '/dashboard' : '/'}`} className={`hover:text-indigo-600 transition ${pathname === '/' || pathname === '/dashboard' ? 'text-indigo-600' : ''}`}>{user ? "Dashboard" : "Home"}</Link>
          <Link href="/shop" className={`hover:text-indigo-600 transition ${pathname === '/shop' ? 'text-indigo-600' : ''}`}>Shop</Link>
          <Link href="/about" className={`hover:text-indigo-600 transition ${pathname === '/about' ? 'text-indigo-600' : ''}`}>About</Link>
          <Link href="/contact" className={`hover:text-indigo-600 transition ${pathname === '/contact' ? 'text-indigo-600' : ''}`}>Contact</Link>
        </div>

        {/* Auth Buttons */}
        {
          !user &&
          <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow"
          >
            Register
          </Link>
        </div>
        }

        {
          user &&
          <button
            onClick={logoutHandler}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow"
          >
            Logout
          </button>
        }

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-white">
          <Link href="/" className="block hover:text-indigo-600">Home</Link>
          <Link href="/shop" className="block hover:text-indigo-600">Shop</Link>
          <Link href="/about" className="block hover:text-indigo-600">About</Link>
          <Link href="/contact" className="block hover:text-indigo-600">Contact</Link>
          <div className="pt-4 border-t">
            <Link href="/login" className="block mb-3 hover:text-indigo-600">Login</Link>
            <Link
              href="/register"
              className="block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
