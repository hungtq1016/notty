import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/libs/prisma';
import { authOptions } from "@/utils/common/oauth2-option"
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
    try {

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            throw new Error('Not signed in');
        } 

        const currentUser = await prisma.user.findUnique({
            where: {
            email: session.user.email,
            }
        });

        if (!currentUser) {
            throw new Error('Not signed in');
        }

        if (!currentUser) {
            throw new Error('Not signed in');
          }

        return NextResponse.json(currentUser)

    } catch (error) {

        throw new Error('Not signed in');
    }

}