import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest) {
    const res = await prisma.folder.findMany({
        where:{
            authorId: String(request.nextUrl.searchParams.get("authorId"))
        }
    })
    return NextResponse.json(res)
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    const res = await prisma.folder.create({
        data: data,
    });

    return NextResponse.json(res); 
}