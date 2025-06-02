'use client'
import React, { ReactNode, useState } from 'react'
import SideBarNavItems from './Sidebar-Nav-Items'
import Header from './Header'

import {
  ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline'

const Main = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
      }

    return (
        <div className="max-w-full">
        <Header isExpanded={isExpanded}/>
        <div className="flex min-h-screen">

            {/* Side Bar */}
            <aside className={`${isExpanded? "w-64": "w-20"} max-md:w-20 whitespace-nowrap p-4 h-screen
            transition-all duration-300 ease-in-out 
            z-25 shadow:lg bg-gray-800 dark:bg-[#1a1a1a] text-white`}>

                {/* SideBar Toggle */}
                <div className={`flex justify-between items-center mb-6 ` }>
                    <div className={`${isExpanded ? "" : "opacity-0 max-w-0"} max-md:hidden overflow-hidden transition-all text-xl font-bold`}>My App</div>
                    <button className="hover:bg-gray-700 p-2 max-md:disabled max-md:hidden" onClick={() => toggleExpanded()}>
                        <ChevronDoubleLeftIcon className="h-6 w-6"/>
                    </button>
                </div>
                
                <SideBarNavItems isExpanded={isExpanded}/>
            </aside>

            {/* Main Content */}
            <main className="w-full px-12 pt-26 bg-blue-50 dark:bg-white/5">
                {children}
            </main>
            </div>
        </div>
    )
}

export default Main