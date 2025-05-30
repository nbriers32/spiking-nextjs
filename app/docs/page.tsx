'use client'
import React, { useEffect, useState } from 'react'
import DocsView from '../components/DocsView'
interface Document {
    name: string,
    type: string
    version: number,
}

const DocsPage = () => {
    const [documentsArr, setDocumentsArr] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [error , setError] = useState("")

    useEffect(() => {
        const getDocumentsData = async () => {
            try {
                const res = await fetch("/api/docs")
                const documents = await res.json()
                setDocumentsArr(documents.data as Document[])
            } catch(err: any) {
                setError(err.message)
            } finally {setLoading(false)}
        }
        getDocumentsData()
    }, [])

    return (
        <>
        <div className="flex justify-between max-sm:flex-col"> 
            <h2 className="font-bold text-3xl"> Documents </h2>
            <div className="flex items-center gap-4">
                <button className="p-2 bg-blue-700 text-white font-bold rounded shadow"> Create New </button>
                <button className="p-2 bg-white font-bold rounded shadow"> Filter By Type </button>
            </div>
        </div>
        <br/>
        <DocsView documentsArr={documentsArr} loading={loading} error={error}/>
        </>
    )
}

export default DocsPage