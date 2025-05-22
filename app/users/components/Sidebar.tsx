'use client'

import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
      <div className="flex h-screen">
        <div className={`bg-gray-800 text-white w-64 p-4 space-y-4 `}>
          <div className="text-xl font-bold mb-6">My App</div>

          <nav className="flex flex-col gap-4">
            <Link href="/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
            <Link href="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
            <Link href="/users" className="hover:bg-gray-700 p-2 rounded">Users</Link>
          </nav>
        </div>
    </div>
    )
}

export default Sidebar