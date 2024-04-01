import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const res = await prisma.image.create({
            data: data,
        });

        return NextResponse.json(res); 
    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}