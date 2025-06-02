import React, { useEffect, useState } from 'react'

import {
    ExclamationCircleIcon
} from "@heroicons/react/24/outline"

const ErrorPopup = ({errMsg}: {errMsg: string}) => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className={`
            ${ isVisible ? "opacity-100" : "opacity-0" }
            transition-all ease-in-out duration-300
        fixed top-0 left-0 w-full z-50
        flex items-center
        bg-white border-2 shadow-md p-4`}>
            <ExclamationCircleIcon className="w-10 h-10 text-red-500"/>
            <p> { errMsg } </p>
        </div>
    )
}

export default ErrorPopup