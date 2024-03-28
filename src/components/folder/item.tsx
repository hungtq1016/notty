/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { classNames } from '@/utils/utils/string.util';
import { TFolder } from '@/types/type';


const FolderItem = (props:TFolder) => {

    const [isError, setIsError] = React.useState(false);
    const pathName = usePathname();
    const isActived = pathName.startsWith("/note/"+props.slug);

    if (isError) {
        return (
            <div className={classNames(isActived ? "bg-sky-600 rounded-2xl":"bg-white group-hover:bg-sky-600 group-hover:rounded-2xl rounded-full " ,"w-12 h-12 flex items-center justify-center  transition-opacity")}>
                <span className={classNames(isActived ? "text-white":"text-black group-hover:text-white","shrink-0 font-medium uppercase")} >{props?.title[0]}</span>
            </div>
        )
    }

    return (
        <Link href={props.slug} className="group has-tooltip" >
            <div className={classNames(isActived ? "rounded-2xl":"rounded-full", "w-12 h-12 object-cover hover:rounded-2xl bg-white")}>
                <img className={classNames(isActived ? "rounded-2xl":"rounded-full", "w-12 h-12 object-cover hover:rounded-2xl")}
                    src={props?.image?.url}
                    alt={props.image?.alt}
                    onError={() => setIsError(true)}
                />
            </div>
            <span className='tooltip rounded shadow-lg p-1 bg-white text-black ml-14 -translate-y-full text-sm font-light capitalize'>{props.title}</span>
        </Link>
    );
};

export default FolderItem;