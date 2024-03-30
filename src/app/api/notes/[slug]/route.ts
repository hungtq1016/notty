import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}: { params: { id: string } }) {
   
    try {
        const res = await prisma.note.findUnique({
            where: {
                id: params.id 
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}