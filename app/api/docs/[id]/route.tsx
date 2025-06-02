import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {id: string} }){
    const {id} = params
    
    const res = await fetch(`http://localhost:5000/documents/${id}`,
        {
            method: "DELETE",
        }
    )

    if (!res.ok) {
        return NextResponse.json({
            message: "Failed to delete document"
        }, {status: res.status})
    }

    return NextResponse.json({
        message: "Successfully deleted document"
    }, {status: 200})
}