import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'
import { slugify } from "@/utils/utils/string.util";


export async function PUT(request: NextRequest,{params}: { params: { slug:string, id: string } }) {
   
    try {

        const data = await request.json();

        if (data === null) {
            return NextResponse.json({ message: "Invalid", status: 400 });
        }

        const res = await prisma.file.update({
            where: {
                id: params.id 
            },
            data: {
                name : data.name,
                slug : slugify(data.name)
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}

export async function DELETE(request: NextRequest,{params}: { params: { slug:string, id: string } }) {
   
    try {
        const res = await prisma.file.delete({
            where: {
                id: params.id 
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}