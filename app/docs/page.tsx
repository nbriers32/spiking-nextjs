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

const docTypes: DocumentType[] = [
    "standards",
    "regulations",
    "icon",
    "template",
    "dummy"
]

const DocsPage = () => {
    const [allDocuments, setAllDocuments] = useState<Document[]>([])
    const [documentsArr, setDocumentsArr] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [getError , setGetError] = useState("")
    const [popupMsg, setPopupMsg] = useState<{message: string, timestamp: number, type: 'success' | 'error'} | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedDocTypes, setSelectedDocTypes] = useState<DocumentType[]>([])

    const handleDocFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.value as DocumentType
        setSelectedDocTypes(currTypes => {
            return currTypes.includes(type) ? currTypes.filter((item) => item !== type) : [...selectedDocTypes, type]
        })
    }

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
                setAllDocuments((currDocsArr => {return [...currDocsArr, data.body ]}))
                setDocumentsArr((currDocsArr => {return [...currDocsArr, data.body ]}))
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
                setAllDocuments(documents.data as Document[])
                setDocumentsArr(documents.data as Document[])
            } catch(err: any) {
                setGetError(err.message)
            } finally {setLoading(false)}
        }
        getDocumentsData()
    }, [])
    
    useEffect(() => {
        if (selectedDocTypes.length === 0) {
            return setDocumentsArr(allDocuments)
        }
        setDocumentsArr(() => {
            return allDocuments.filter(doc => {
                return selectedDocTypes.includes(doc.type)
            })
        })
    }, [selectedDocTypes])

    return (
        <>
        {popupMsg  && (<Popup key={popupMsg.timestamp} popupMsg={popupMsg.message} type={popupMsg.type}/>)}
        <div className={`${isModalOpen ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in-out`}>
            { isModalOpen &&
            <Overlay>
                {/* Modal Window */}
                <div className="p-6 rounded-lg bg-white dark:bg-menu shadow-sm">
                    <div>
                        <div className="flex flex-row justify-between items-center gap-4">
                        <h3 className="text-2xl font-bold"> Create New Document </h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 bg-accent rounded shadow font-bold dark:text-black"> Close</button>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={(e) => handleCreateDoc(e)}>
                                <span>
                                    <label htmlFor="name">Document Name </label>
                                    <br/>
                                    <input className="border-1 rounded bg-background w-full dark:bg-transparent" type="string" id="name" required/>
                                </span>
                                
                                <span>
                                    <label htmlFor="version">Version </label>
                                    <br/>
                                    <input className="border-1 rounded bg-background w-full dark:bg-transparent" type="number" id="version" step="any" required/>
                                </span>
                        
                                <span>
                                    <label htmlFor="type"> Type </label>
                                    <br/>
                                    <select defaultValue="" className="border-1 rounded bg-background w-full dark:bg-transparent" id="type" required>
                                        <option hidden disabled value=""> Document Type </option>
                                        <option value="standards" className="dark:bg-menu"> Standards </option>
                                        <option value="regulations" className="dark:bg-menu"> Regulations </option>
                                        <option value="icon" className="dark:bg-menu"> Icon </option>
                                        <option value="template" className="dark:bg-menu"> Template </option>
                                    </select>
                                </span>

                            <input className="p-2 bg-blue-700 text-white font-bold rounded shadow" type="submit" value="Create Document"/>
                        </form>
                    </div>
                </div>
            </Overlay>
            }
        </div>
        
        
        <div className="flex justify-between max-sm:flex-col"> 
            <h2 className="font-bold text-3xl"> Documents </h2>
            <div className="relative flex items-center gap-4">
                <button onClick = {() => handleOpenModal()} className="p-2 bg-primary text-white font-bold rounded shadow"> Create New </button>

                <div className="relative inline-block">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 border-1 bg-white dark:bg-accent-dark dark:border-border-dark font-bold rounded shadow"> Filter By Type </button>
                    {/* Dropdown Menu */ }
                    <div className={`${isDropdownOpen ? 'max-h-40 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
                    transition-all duration-300 ease-in-out 
                    absolute mt-2 z-10 bg-white dark:bg-gray-700 dark:shadow-md dark:border-1 shadow-md w-full p-2 overflow-hidden `}>
                        {
                            docTypes.map((type, i) => {
                                return (
                                    <div key={i} className="flex flex-row items-center">
                                    <input type="checkbox" id={type} className="w-5 h-5 accent-primary bg-accent border-border rounded" value={type} onChange={(e) => handleDocFilter(e)}/>
                                    <label htmlFor={type}> {type[0].toUpperCase() + type.slice(1)} </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <DocsView documentsArr={documentsArr} loading={loading} error={getError}/>
        </>
    )
}

export default DocsPage