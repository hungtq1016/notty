import NextAuth from "next-auth"
import {authOptions} from "@/utils/common/oauth2-option"

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }