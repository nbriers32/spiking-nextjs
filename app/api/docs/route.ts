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

    const todo = await res.json();

    return NextResponse.json({ 
        message: "New document successfully created",
        body: todo
    },
        { status: 201 },
    );
}

export async function DELETE(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    console.log(searchParams)
}