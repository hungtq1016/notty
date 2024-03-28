'use client'
import { redirect } from "next/navigation";
import useFolder from '@/utils/hooks/useFolder'
import { PropsWithChildren } from "react";

export default function Page({ children,params }: { children:PropsWithChildren,params: { folder: string } }){
    const { data,isLoading,error } = useFolder(params.folder)
    if (isLoading || error) {
        return <div>Loading...</div>
    }
    if (data === null) {
        redirect("/note/me")
    }
    return <>{children}</>
}