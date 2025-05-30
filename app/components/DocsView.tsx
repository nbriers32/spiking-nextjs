import React from 'react'

interface Document {
    name: string,
    type: string
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