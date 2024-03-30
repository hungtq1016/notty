import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest) {
    try {
        const res = await prisma.file.findMany({
            where:{
                folderId: String(request.nextUrl.searchParams.get("folderId"))
            },
            include: {
                folder: true
            }
            
        })
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (data === null) {
            return NextResponse.json({ message: "Invalid", status: 400 });
        }
        
        const res = await prisma.file.create({
            data: {
                name: data.name,
                folderId : data.folderId,
                slug: data.slug,
            }
        });
        
    return NextResponse.json({...res});

    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    } 
}