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
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndStoreFacts = async () => {
            try {
                const res = await fetch("https://awamody522.execute-api.eu-west-1.amazonaws.com/Prod/facts")
                const {data} = await res.json()
                setFacts(data)
            } catch(err: any) {setError(err.message)}
            finally {setLoading(false)}
        }
        getAndStoreFacts()  
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
                bg-white dark:bg-menu-dark
                top-0 left-0 w-screen fixed h-20
                shadow-md border-b-1 border-border dark:border-none
                flex items-center justify-center`}>

            {/* Random Facts  */}
            <div>
                <p className={`${isFactVisible ? "" : "opacity-0"}
                 transition-opacity duration-500 ease-in-out`}>  
                 {error ? "Error loading facts..." : loading ? "Loading facts..." : `${facts[index].fact} ${facts[index]?.source ? `- ${facts[index].source}` : ""}` }
                 </p>
            </div>
        </div>
    )
}

export default Header