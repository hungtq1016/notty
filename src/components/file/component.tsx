'use client'

import { useContext } from "react";
import { FolderContext } from "../context/folder-context";
import useFiles from "@/utils/hooks/useFiles";
import FileItem from "./item";
import FileAdd from "./add";
import { redirect } from "next/navigation";
import LoadingFileLayout from "../loading/file";

const FileComponent = () => {

    const folder = useContext(FolderContext);

    if (folder === null) redirect('/note/me')

    const { data, error, isLoading, mutate, isValidating } = useFiles({ folderId: folder.id });

    if (isLoading || error || isValidating) return <LoadingFileLayout />

    return (
        <div className="flex grow flex-col gap-y-5">
            <div className="py-5">
                <h3 className="flex justify-between items-center">
                    <span className="font-semibold text-sm capitalize">{folder.title}</span>
                    <FileAdd mutate={mutate} />
                </h3>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 space-y-1 flex flex-1 flex-col">
                        {data?.map((file) => (
                            <li key={file.id}>
                                <FileItem file={file} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default FileComponent;