import { NextResponse, NextRequest } from "next/server";

const documents = [
    {
        name: "Home Bargains Icon",
        version: 1,
        type: "icon",
    },
    {
        name: "Food Safety Standards",
        version: 1.7,
        type: "standards"
    },
    {
        name: "Document 3",
        version: 3,
        type: "dummy",
    },
    {
        name: "Faulty Document Type",
        version: 0,
        type: "fake type"
    }
]

export async function GET() {
    return NextResponse.json({
        message: "Successfully queried documents",
        data: documents
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    console.log(body)

    if (!body.name || !body.version || !body.type){
        return NextResponse.json(
            {message: "Body must contain a name, version, and a type"},
            {status: 400}
        );
    }

    documents.push(body)

    return NextResponse.json(
        { message: "New document successfully created"},
        { status: 201 },
    );
}