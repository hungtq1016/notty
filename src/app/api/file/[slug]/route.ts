import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma'
import { slugify } from "@/utils/utils/string.util";

export async function GET(request: NextRequest,{params}: { params: { slug: string } }) {
    const res = await prisma.file.findUnique({
        where: {
            slug: params.slug 
        }
    })
    return NextResponse.json(res)
}
