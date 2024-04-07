'use client'

import { useContext, useEffect, useState } from "react";
import { FolderContext } from "../context/folder-context";
import FileItem from "./item";
import FileAdd from "./add";
import LoadingFileLayout from "../loading/file";
import { useParams } from 'next/navigation'
import useFetch from "@/utils/hooks/use-fetch";
import { TFile } from "@/types/type";

const FileComponent = () => {

    const folder = useContext(FolderContext);

    const params = useParams<{ folder: string }>();

    const { data, isLoading, error, isValidating, mutate } = useFetch<TFile[]>("/api/file",{ folderId: folder.id });

    const [files, setFiles] = useState<TFile[] | undefined>(data)

    useEffect(() => {
        setFiles(data);
    }, [data])

    useEffect(() => {
        mutate();
    }, [params.folder])

    if (isLoading || error || files === undefined || isValidating) return <LoadingFileLayout />

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    }

    return (
        <div className="flex grow flex-col gap-y-5">
            <div className="py-5">
                <h3 className="flex justify-between items-center">
                    <span className="font-semibold text-sm capitalize">{folder.title}</span>
                    <FileAdd mutate={mutate} />
                </h3>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 space-y-1 flex flex-1 flex-col">
                        {files.map((file, index) => (
                            <li key={file.id}>
                                <FileItem 
                                onDelete={()=>removeFile(index)}
                                file={file} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default FileComponent;