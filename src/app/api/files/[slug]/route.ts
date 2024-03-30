import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}: { params: { slug: string } }) {
    const res = await prisma.file.findUnique({
        where: {
            slug: params.slug 
        }
    })
    return NextResponse.json(res)
}