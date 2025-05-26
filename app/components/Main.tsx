import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <Header/>
        
        <Sidebar/>

        {/* Main Content */}
        <main className="w-full p-12 pt-26 bg-blue-50">
            {children}
        </main>
    </div>
  )
}

export default Main