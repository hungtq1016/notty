import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from 'next-auth/adapters';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter:  PrismaAdapter(prisma) as Adapter,
    providers: [
  
      GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      })
    ],
   
    debug: process.env.NODE_ENV === 'development',
    session : { strategy: 'jwt' },
  
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session ({ session, token, user }) {
        const sanitizedToken = Object.keys(token).reduce((p, c) => {
          // strip unnecessary properties
          if (
            c !== "iat" &&
            c !== "exp" &&
            c !== "jti" &&
            c !== "apiToken"
          ) {
            return { ...p, [c]: token[c] }
          } else {
            return p
          }
        }, {})
        return { ...session, user: sanitizedToken, apiToken: token.apiToken }
      },
      async jwt ({ token, user, account, profile }) {
        if (typeof user !== "undefined") {
          // user has just signed in so the user object is populated
          return user as unknown as JWT
        }
        return token
      }
    }
  }
  