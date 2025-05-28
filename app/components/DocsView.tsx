import React, { useEffect, useState } from 'react'

interface Document {
    name: string,
    type: string
    version: number,
}

const DocsView = () => {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [error , setError] = useState(false)

    useEffect(() => {
        const getDocumentsData = async () => {
            try {
                const req = await fetch("/api/docs")
                const documents = await req.json()
                setDocuments(documents.data as Document[])
            } catch(err: any) {
                setError(err.message)
            } finally {setLoading(false)}
        }
        getDocumentsData()
    }, [])
    return (
        <>
            { error ? <p> Error getting documents </p> 
            : loading ? <p> Loading documents </p> 
            : ( 
                <div className="grid sm: grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {documents.map((document, i) => {
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-xl">
                        <span className="flex flex-row">
                            <p className="font-bold"> {document.name} </p>
                        </span>
                        <p className="text-sm text-gray-500 italic"> v{document.version}</p>
                    </div>
                )})}
                </div>
            )}
        </>
    )
}

export default DocsView