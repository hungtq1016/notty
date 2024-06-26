import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest,{params}: { params: { id: string } }) {
   
    try {
        const res = await prisma.note.findUnique({
            where: {
                id: params.id 
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}

export async function PUT(request: NextRequest,{params}: { params: { id: string } }) {
   
    try {

        const data = await request.json();

        if (data === null) {
            return NextResponse.json({ message: "Invalid", status: 400 });
        }

        const res = await prisma.note.update({
            where: {
                id: params.id 
            },
            data: {
                fileId: data.fileId,
                content: data.content,
                title: data.title,
                color: data.color,
                prioritize: data.prioritize,
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}

export async function DELETE(request: NextRequest,{params}: { params: { id: string } }) {
   
    try {
        const res = await prisma.note.delete({
            where: {
                id: params.id 
            }
        })
        return NextResponse.json(res)

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}