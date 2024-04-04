import { NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma';
import { authOptions } from "@/utils/common/oauth2-option"
import { getServerSession } from 'next-auth';

export async function GET() {
    try {

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            throw new Error('Email is invalid!');
        } 

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            }
        });

        if (!currentUser) {
            throw new Error('User not found!');
        }

        return NextResponse.json(currentUser)

    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!');
    }

}

export const dynamic = "force-dynamic";
