import { NextApiRequest, NextApiResponse } from 'next';

import prisma from './prisma';
import { authOptions } from "@/utils/common/oauth2-option"
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";

const currentUser = async () => {

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

  return { currentUser };
};

export default currentUser;