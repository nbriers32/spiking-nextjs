"use client"
import React, { useEffect, useState } from 'react'
import {
    EnvelopeIcon,
    PhoneIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string,
}

const Users = () => {
    const tableHeaders = ["Name", "Username", "Contact", "View Tasks"]
    const [userData, setUserData] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isMobileView, setIsMobileView] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                    cache: 'no-store'
                })
                const users: User[] = await res.json();
                setUserData(users)
            } catch(err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getUserData()
    }, [])

    useEffect(() => {
        window.addEventListener("resize", () => setIsMobileView(window.innerWidth <= 848))
        return () => window.removeEventListener("resize", () => setIsMobileView(window.innerWidth <= 848) )
    }, [])

    if (error) {
        return <p> Error whilst fetching user data: {error} </p>
    }

    return (
        <>
        {loading ? <p> Loading...</p> :
            isMobileView ? (
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Mobile View */}
                    {userData.map(user => {
                        return (
                            <Link href={`/users/${user.id}`} key={user.id} className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-lg hover:bg-slate-100 dark:hover:bg-gray-700">
                                <p className="font-bold">{user.name} </p>
                                <p className="text-gray-800 text-xs italic"> @{user.username} </p>
                                <span className="flex flex-row items-center"><EnvelopeIcon className="h-4 w-4"/> {user.email}</span>
                                <span className="flex flex-row items-center"><PhoneIcon className="h-4 w-4"/> {user.phone}</span>
                            </Link>
                        )
                    })}
                </div>
            ) : (
                <div className="max-h-[calc(100vh-256px)] overflow-y-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-lg">
                    {/* Desktop View */}
                <table className="min-w-full border-collapse text-left table-auto">
                    <thead>
                    <tr>
                        { tableHeaders.map(((header, i) => {
                            return <th key={i} className="border-b-2 border-gray-200 dark:border-gray-700"> {header} </th>
                        }))}
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((user, i) => {
                        return (
                        <tr key={i} className="hover:bg-slate-100 dark:hover:bg-gray-700">
                            <td className="p-2 border-b border-gray-200 dark:border-gray-700"> {user.name} </td>
                            <td className="p-2 border-b border-gray-200 dark:border-gray-700"> {user.username} </td>
                            <td className="p-2 flex flex-col border-b border-gray-200 dark:border-gray-700"> 
                                <span className="flex flex-row items-center"><EnvelopeIcon className="h-4 w-4"/> {user.email}</span>
                                <span className="flex flex-row items-center"><PhoneIcon className="h-4 w-4"/> {user.phone}</span>
                            </td>
                            <td className="p-2 border-b border-gray-200 dark:border-gray-700"><Link href={`/users/${user.id}`}><MagnifyingGlassIcon className="w-8 h-8"/></Link></td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            )

        }
        </>
    )
}

export default Users