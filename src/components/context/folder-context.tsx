"use client"
import { PropsWithChildren, createContext } from "react";
import useFolder from '@/utils/hooks/use-folder'
import { redirect, useParams } from "next/navigation";
import { TFolder } from "@/types/type";
import LoadingFileLayout from "../loading/file";

const FolderContext = createContext<TFolder>({} as TFolder);

const FolderProvider = ({ children }: PropsWithChildren) => {

    const params = useParams<{ folder: string }>()

    const { data, isLoading, error} = useFolder(params.folder);

    if(isLoading || error || data === undefined) return< div className="flex flex-col px-4 bg-gray-50 w-56"><LoadingFileLayout/></div>

    if (data === null) {
        redirect("/note/me")
      }

    return (
        <FolderContext.Provider value={data}>
            {children}
        </FolderContext.Provider>
    )
}

export { FolderContext, FolderProvider }