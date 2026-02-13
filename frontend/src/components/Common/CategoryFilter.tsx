'use client'

import React, { useState } from 'react'
import Link from 'next/link'

function CategoryFilter() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Categories
        <svg
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
          <ul className="p-2 text-sm">
            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Settings
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Earnings
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
