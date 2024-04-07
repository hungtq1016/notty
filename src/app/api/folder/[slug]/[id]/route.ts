import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function DELETE(request: NextRequest,{params}: { params: { slug: string, id: string } }) {
   
    try {
        const res = await prisma.folder.delete({
            where: {
                id: params.id 
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}