'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const SingleDocPage = () => {
    const {id} = useParams()
    return (
        <>
        <h2 className="font-bold text-3xl"> Doc Name </h2>
        <br/>
        <div className="bg-white rounded shadow-md
        w-full p-4
        flex gap-4">
        </div>
        </>
    )
}

export default SingleDocPage