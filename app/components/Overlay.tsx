import React, { ReactNode } from 'react'

const Overlay = ({ children }: { children: ReactNode }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-32  
        bg-black/50
        flex items-center justify-center ">
            {children}
        </div>
    )
}

export default Overlay