"use client"
import { PropsWithChildren, createContext } from "react";
import { redirect, useParams } from "next/navigation";
import { TFile } from "@/types/type";
import useFile from "@/utils/hooks/useFile";
import NoteLoading from "../loading/note";

const FileContext = createContext<TFile>({} as TFile);

const FileProvider = ({ children }: PropsWithChildren) => {

    const params = useParams<{ file: string }>()
    const { data, isLoading, error} = useFile(params.file);

    if(isLoading || error ) return <NoteLoading />;

    if(!data) return redirect('/');
    
    return (
        <FileContext.Provider value={data}>
            {children}
        </FileContext.Provider>
    )
}

export { FileContext, FileProvider }