import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest) {
    try {
        const res = await prisma.note.findMany({
            orderBy: { prioritize: 'desc' },
            where:{
                fileId: String(request.nextUrl.searchParams.get("fileId"))
            }
        })
        return NextResponse.json(res)
    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (data === null) {
            return NextResponse.json({ message: "Invalid", status: 400 });
        }
        
        const res = await prisma.note.create({
            data: {
                id: data.id,
                fileId: data.fileId,
                content: data.content,
                title: data.title,
                color: data.color,
                prioritize: data.prioritize,
            }
        });
        
    return NextResponse.json({...res});

    } catch (error) {
        return new Response(String(error), { status: 500 });
    } 
}