'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import {
  ChevronDoubleLeftIcon,
  HomeIcon,
  UserIcon,
  DocumentDuplicateIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";


const Sidebar = () => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const navItemsTop = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/users', label: 'Users', icon: UserIcon },
    { href: '/docs', label: 'Documents', icon: DocumentDuplicateIcon },
  ]

  const navItemsBottom = [
    { href: '/settings', label: 'Settings', icon: CogIcon },
    { href: '/help', label: 'Help', icon: InformationCircleIcon },
  ]

  return (
    <aside className={`${isExpanded? "w-64": "w-20"} max-md:w-20 whitespace-nowrap transition-all duration-300 ease-in-out h-screen`}>

      {/* Side Bar */}
      <div className=" shadow:lg bg-gray-800 text-white p-4 h-full ">
        
        <div className={`flex justify-between items-center mb-6`}>
          <div className={`${isExpanded ? "" : "opacity-0 max-w-0"} max-md:hidden overflow-hidden transition-all text-xl font-bold`}>My App</div>
          <button className="hover:bg-gray-700 p-2 max-md:disabled max-md:hidden" onClick={() => toggleExpanded()}>
            <ChevronDoubleLeftIcon className="h-6 w-6"/>
          </button>
        </div>

        <nav className="flex flex-col gap-4">

          {navItemsTop.map((navItemTop, i) => {
            return (
              <Link href={navItemTop.href} key={i} className={`${navItemTop.href === pathname ? 'text-blue-700 font-bold' : '' } relative transition-colors flex items-center hover:bg-gray-700 p-2 rounded gap-4`}>
                <navItemTop.icon className="w-6 h-6"/>
                {isExpanded && <p className="max-md:hidden"> {navItemTop.label}</p>}
              </Link>
            )
          })}

          <hr className="my-3 text-gray-700"></hr>

          {navItemsBottom.map((navItemBottom, i) => {
            return (
              <Link href={navItemBottom.href} key={i} className={`${navItemBottom.href === pathname ? 'text-blue-700 font-bold' : ''} transition-colors relative flex items-center hover:bg-gray-700 p-2 rounded gap-4`}>
                <navItemBottom.icon className="w-6 h-6"/>
                {isExpanded && <p className="max-md:hidden"> {navItemBottom.label}</p>}
              </Link>
            )
          })}

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar