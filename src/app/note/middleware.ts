import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
    function middleware(req: NextRequest) {
        return NextResponse.rewrite(new URL("/",req.url))
    },
    {
        callbacks: {
            authorized: ({ token, req }) => token !== null,
        },
    }
)