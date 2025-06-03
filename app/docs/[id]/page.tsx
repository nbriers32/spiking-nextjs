'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Popup from '@/app/components/Popup'

import {
    TrashIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline'

type DocumentType = "standards" | "regulations" | "icon" | "template" | "dummy"
interface Document {
    id: number,
    name: string,
    type: DocumentType
    version: number,
}

const SingleDocPage = () => {
    const router = useRouter()
    const [document, setDocument] = useState<Document>()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const [popupMsg, setPopupMsg] = useState<{message: string, type: 'success' | 'error', timestamp: number}>()
    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteDoc = () => {
        const deleteDoc = async () => {
            try {
                const res = await fetch(`/api/docs/${id}`, {
                    method: "DELETE",
                    headers: {'Content-Type': "application/json" },
                })
                await res.json()
                setIsDeleted(true)
                setPopupMsg({message: 'Successfully deleted document, redirecting you now...', timestamp: Date.now(), type: 'success'})
                setTimeout(() => {
                    router.push('/docs')
                }, 3000)
            }catch(err: any){ setError(err.message)}
        }
        deleteDoc()
    }

    useEffect(() => {
        const getDocById = async () => {
            try {
                const res = await fetch(`http://localhost:5000/documents/${id}`)
                const data = await res.json()
                setDocument(data as Document)
            } catch(err: any){
                setError(err.message)
            } finally {setLoading(false)}
        }
        getDocById()
    }, [])

    if (loading) return <p> Loading single document... </p>
    if (error) return <p> {error} </p>

    return document && (
        <>
        {popupMsg && (<Popup key={popupMsg.timestamp} popupMsg={popupMsg.message} type={popupMsg.type}/>)}
        <h2 className="font-bold text-3xl"> Document Details </h2>
        <br/>
        <div className="bg-background dark:bg-slate-700 rounded shadow-md
        p-8
        flex gap-4 flex-col">
            <div className="flex justify-between">
                <p className="text-gray-500 dark:text-white"> Edit/delete your document's information </p>
                <button onClick={() => router.push('/docs')} className="p-2 bg-slate-300 rounded shadow font-bold dark:bg-slate-00 dark:text-black"> Close</button>
            </div>

            {/* Document Fields */}
            {Object.entries(document).map(([key, value]) => {
                return (
                    <span key={value}>
                        <p> {key[0].toUpperCase() + key.slice(1)}:</p>
                        <input className="border-1 rounded bg-blue-50 dark:bg-transparent w-full font-bold p-2" type="string" id={value} placeholder={value}/> 
                    </span>
                )
            })}

            <div className="flex flex-row justify-between">
                { !isDeleted && 
                    <>
                        <button className="p-2 bg-red-400 text-white font-bold rounded shadow flex flex-row items-center" onClick={() => handleDeleteDoc()}>  
                            <TrashIcon className="w-6 h-6 text-white"/> Delete Document</button>
                        <button className="p-2 bg-blue-700 text-white font-bold rounded shadow flex flex-row items-center" onClick={() => setPopupMsg({message: "Successfully updated document", type: "success", timestamp: Date.now()})}>
                            <DocumentCheckIcon className="text-white h-6 w-6"/>  Save Changes </button>

                    </>
                }
            </div>
        </div>
        </>
    )
}

export default SingleDocPage