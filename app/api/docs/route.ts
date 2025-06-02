import { NextResponse, NextRequest } from "next/server";


export async function GET() {
    const res = await fetch("http://localhost:5000/documents")
    const documents = await res.json()

    return NextResponse.json({
        message: "Successfully queried documents",
        data: documents
    })
}


export async function POST(request: NextRequest) {
    const body = await request.json()

    if (!body.name || !body.version || !body.type){
        return NextResponse.json(
            {message: "Body must contain a name, version, and a type"},
            {status: 400}
        );
    }

    const res = await fetch("http://localhost:5000/documents",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
    )

    if (!res.ok) {
        return NextResponse.json({
            message: "Failed to delete document"
        }, {status: res.status})
    }

    const doc = await res.json();

    return NextResponse.json({ 
        message: "New document successfully created",
        body: doc
    },
        { status: 201 },
    );
}
