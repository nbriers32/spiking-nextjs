"use client"
import React, { useEffect, useState } from 'react'

interface Fact {
    fact: string,
    source? : string
}

const Header = ({isExpanded}: {isExpanded: boolean}) => {
    const [facts, setFacts] = useState<Fact[]>([])
    const [index, setIndex] = useState(0);
    const [isFactVisible, setIsFactVisible] = useState(true)

    useEffect(() => {
        try {
            const getAndStoreFacts = async () => {
                const res = await fetch("https://awamody522.execute-api.eu-west-1.amazonaws.com/Prod/facts")
                const {data} = await res.json()
                setFacts(data)
            }
            getAndStoreFacts()  
        } catch(err) {console.log(err)}
    }, []);
    
    useEffect(() => {
        if (!facts.length) return;
        const interval = setInterval(() => {
            setIsFactVisible(false)
            setTimeout(() => {
                setIndex((currIndex) => (currIndex + 1) % (facts.length))
                setIsFactVisible(true)
            }, 500)
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    
    }, [facts])

    return (
        <div 
            className={`
                ${isExpanded ? 'pl-64' : 'pl-20'} max-md:pl-20 overflow-hidden
                transition-[padding] duration-300 ease-in-out
                bg-white dark:bg-gray-800
                top-0 left-0 w-screen fixed h-20
                shadow-md border-b-2 border-gray-300 
                flex items-center justify-center`}>

            {/* Random Facts  */}
            <div>
                <p className={`${isFactVisible ? "" : "opacity-0"}
                 transition-opacity duration-500 ease-in-out`}>  
                 {facts[index]?.fact || "Loading facts..."} {facts[index]?.source ? `- ${facts[index].source}` : ""} 
                 </p>
            </div>
        </div>
    )
}

export default Header