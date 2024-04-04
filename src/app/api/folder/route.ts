import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest) {
    const res = await prisma.folder.findMany({
        where:{
            authorId: String(request.nextUrl.searchParams.get("authorId"))
        },
        include: {
            image: true,
            group: true
        }
        
    })
    return NextResponse.json(res)
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (data === null) {
            return NextResponse.json({ message: "Invalid", status: 400 });
        }
        const img = await prisma.image.create({
            data: {
                url: data.image.url,
                alt: data.image.alt
            }
        });
        
        const res = await prisma.folder.create({
            data: {
                slug: data.slug,
                title: data.title,
                authorId: data.authorId,
                imageId: img.id
            }
        });
        
    return NextResponse.json({...res, image: img});

    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });

    } 
}