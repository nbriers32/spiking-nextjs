'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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

    return (
        <>
        <h2 className="font-bold text-3xl"> {document?.name} </h2>
        <br/>
        <div className="bg-white rounded shadow-md
        w-full p-4
        flex gap-4">
        </div>
        </>
    )
}

export default SingleDocPage