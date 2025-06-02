'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Popup from '@/app/components/Popup'

type DocumentType = "standards" | "regulations" | "icon" | "template" | "dummy"
interface Document {
    id: number,
    name: string,
    type: DocumentType
    version: number,
}

const SingleDocPage = () => {
    const [document, setDocument] = useState<Document>()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const [popupMsg, setPopupMsg] = useState<{message: string, type: 'success' | 'error', timestamp: number}>()

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
        <div className="bg-white rounded shadow-md
        p-8
        flex gap-4 flex-col">
        <p className="text-gray-500"> Edit/delete your document's information </p>
            {Object.entries(document).map(([key, value]) => {
                return (
                    <span key={value}>
                        <p> {key[0].toUpperCase() + key.slice(1)}:</p>
                        <input className="border-1 rounded bg-blue-50 w-full font-bold p-2" type="string" id={value} value={value}/> 
                    </span>
                )
            })}
            <div className="flex flex-row justify-between">
                <button className="p-2 bg-red-400 text-white font-bold rounded shadow">  Delete Document</button>
                <button className="p-2 bg-blue-700 text-white font-bold rounded shadow" onClick={() => setPopupMsg({message: "Successfully updated document", type: "success", timestamp: Date.now()})}> Save Changes </button>
            </div>
        </div>
        </>
    )
}

export default SingleDocPage