import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Successfully queried documents",
        data: [
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
        ]
    })
}
