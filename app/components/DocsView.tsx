import React from 'react'
import DocumentIcon from './DocumentIcon'
import Link from 'next/link'

interface Document {
    id: number,
    name: string,
    type: "standards" | "regulations" | "icon" | "template" | "dummy"
    version: number,
}
interface DocsViewProps {
    documentsArr: Document[],
    loading: boolean,
    error: string | null,
}

const DocsView: React.FC<DocsViewProps> = ({documentsArr, loading, error}) => {
    return (
        <>
            { error ? <p> Error getting documents </p> 
            : loading ? <p> Loading documents </p> 
            : ( 
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {documentsArr.map((document, i) => {
                    return (
                        <Link key={i} href={`/docs/${document.id}`}>
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-xl hover:bg-slate-100 dark:hover:bg-gray-700">
                            <span className="flex flex-row">
                                <p className="font-bold"> {document.name} </p>
                            </span>
                            <p className="text-sm text-gray-500 italic"> v{document.version}</p>
                            <DocumentIcon docType={document.type}/>
                            </div>
                        </Link>
                )})}
                </div>
            )}
        </>
    )
}

export default DocsView