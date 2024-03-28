'use client'

import { TFolder } from "@/types/type";
import { classNames } from "@/utils/utils/string.util";
import { useState } from "react";
import FolderItem from "./item";
import FolderItemTiny from "./item-tiny";

const FolderGroup = ({folders}:{folders:TFolder[]}) : React.JSX.Element => {

    const [isOpen, setIsOpen] = useState(false);
    if (isOpen) {
        folders = folders.slice(0,4)
    }
    return (
        <div className="relative">
            {!isOpen && <div className="absolute inset-0" onClick={()=>setIsOpen(true)}></div>}
            <div className={classNames(isOpen ? "h-auto bg-black/30 rounded-full flex-col" : "h-12 bg-black/60 rounded-2xl flex-wrap p-1","w-12 flex gap-2")}>
                {
                    isOpen && (
                        <div onClick={()=>setIsOpen(false)}
                        className={classNames("w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-900 transition-opacity")}>
                            <span className={classNames("shrink-0 uppercase text-white font-bold")} >#</span>
                        </div>
                    )
                }
                {   
                    folders.map((folder:TFolder,index:number) => (
                        isOpen ? <FolderItem key={index} {...folder}/>
                        : <FolderItemTiny key={index} {...folder}/>
                    ))
                }
            </div>
        </div>
    );
}

export default FolderGroup;