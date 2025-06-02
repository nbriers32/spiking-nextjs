'use client'
import React, { useEffect, useState } from 'react'
import DocsView from '../components/DocsView'
import Overlay from '../components/Overlay'
import Popup from '../components/Popup'

type DocumentType = "standards" | "regulations" | "icon" | "template" | "dummy"
interface Document {
    id: number,
    name: string,
    type: DocumentType
    version: number,
}

const DocsPage = () => {
    const [documentsArr, setDocumentsArr] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [getError , setGetError] = useState("")
    const [popupMsg, setPopupMsg] = useState<{message: string, timestamp: number, type: 'success' | 'error'} | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCreateDoc = (e: any) => {
        e.preventDefault()
        const {name, version, type} = e.target
        const docToPost = {
            name: name.value,
            version: version.value,
            type: type.value
        }
        const postDoc = async () => {
            try {
                const res = await fetch("/api/docs", {
                    method: "POST",
                    headers: {'Content-Type': "application/json" },
                    body: JSON.stringify(docToPost)
                })
                const data = await res.json()
                setDocumentsArr((currDocsArr => {
                    return [...currDocsArr, data.body ]
                }))
                setPopupMsg({message: data.message, timestamp: Date.now(), type: "success"})
            } catch(err: any) {
                setPopupMsg({message: err.message, timestamp: Date.now(), type: "error"})
            } finally {
                setIsModalOpen(false)
                e.target.reset()
            }
        }
        postDoc()
    }

    useEffect(() => {
        const getDocumentsData = async () => {
            try {
                const res = await fetch("/api/docs")
                const documents = await res.json()
                setDocumentsArr(documents.data as Document[])
            } catch(err: any) {
                setGetError(err.message)
            } finally {setLoading(false)}
        }
        getDocumentsData()
    }, [])

    return (
        <>
        {popupMsg  && (<Popup key={popupMsg.timestamp} popupMsg={popupMsg.message} type={popupMsg.type}/>)}
        <div className={`${isModalOpen ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in-out`}>
            <Overlay>
                {/* Modal Window */}
                <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div>
                        <h3 className="text-2xl font-bold"> Create New Document </h3>
                        <form className="flex flex-col gap-4" onSubmit={(e) => handleCreateDoc(e)}>
                                <span>
                                    <label htmlFor="name">Document Name </label>
                                    <br/>
                                    <input className="border-1 rounded bg-blue-50 w-full" type="string" id="name" required/>
                                </span>
                                
                                <span>
                                    <label htmlFor="version">Version </label>
                                    <br/>
                                    <input className="border-1 rounded bg-blue-50 w-full" type="number" id="version" step="any" required/>
                                </span>
                        
                                <span>
                                    <label htmlFor="type"> Type </label>
                                    <br/>
                                    <select defaultValue="" className="border-1 rounded bg-blue-50 w-full" id="type" required>
                                        <option hidden disabled value=""> Document Type </option>
                                        <option value="standards"> Standards </option>
                                        <option value="regulations"> Regulations </option>
                                        <option value="icon"> Icon </option>
                                        <option value="template"> Template </option>
                                    </select>
                                </span>

                            <input className="p-2 bg-blue-700 text-white font-bold rounded shadow" type="submit" value="Create Document"/>
                        </form>
                    </div>
                </div>
            </Overlay>
        </div>
        
        
        <div className="flex justify-between max-sm:flex-col"> 
            <h2 className="font-bold text-3xl"> Documents </h2>
            <div className="relative flex items-center gap-4">
                <button onClick = {() => handleOpenModal()} className="p-2 bg-blue-700 text-white font-bold rounded shadow"> Create New </button>
                <button className="p-2 bg-white font-bold rounded shadow"> Filter By Type </button>
            </div>
        </div>
        <br/>
        <DocsView documentsArr={documentsArr} loading={loading} error={getError}/>
        </>
    )
}

export default DocsPage