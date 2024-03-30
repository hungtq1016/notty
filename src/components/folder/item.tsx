/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { TFolder } from '@/types/type';
import { capitalizeFirstChar, classNames, hrefBuilder } from '@/utils/utils/string.util';

const FolderItem = (folder:TFolder) => {

    const [isError, setIsError] = React.useState(false);
    const params = useParams<{ folder:string }>();
    const isActived = params.folder === folder.slug;

    if (isError) {
        return (
            <Link href={hrefBuilder([folder.slug])} className="group has-tooltip" >
                <div className={classNames(isActived ? "bg-sky-600 rounded-2xl":"bg-white group-hover:bg-sky-600 group-hover:rounded-2xl rounded-full " ,"w-12 h-12 flex items-center justify-center  transition-opacity")}>
                    <span className={classNames(isActived ? "text-white":"text-black group-hover:text-white","shrink-0 font-medium uppercase")} >{capitalizeFirstChar(folder.title)}</span>
                </div>
                <span className='tooltip rounded shadow-lg p-1 bg-white text-black ml-14 -translate-y-full text-sm font-light capitalize'>{folder.title}</span>
            </Link>
        )
    }

    return (
        <Link href={hrefBuilder([folder.slug])} className="group has-tooltip" >
            <div className={classNames(isActived ? "rounded-2xl":"rounded-full", "w-12 h-12 object-cover hover:rounded-2xl bg-white")}>
                <img className={classNames(isActived ? "rounded-2xl":"rounded-full", "w-12 h-12 object-cover hover:rounded-2xl")}
                    src={folder?.image?.url}
                    alt={folder.image?.alt}
                    onError={() => setIsError(true)}
                />
            </div>
            <span className='tooltip rounded shadow-lg p-1 bg-white text-black ml-14 -translate-y-full text-sm font-light capitalize'>{folder.title}</span>
        </Link>
    );
};

export default FolderItem;