/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import { TFolder } from '@/types/type';
import { capitalizeFirstChar } from '@/utils/utils/string.util';


const FolderItemTiny = (folder:TFolder) => {

    const [isError, setIsError] = React.useState(false);

    if (isError) {
        return (
            <div className="w-4 h-4 flex items-center justify-center rounded-full ">
                <span className="shrink-0 font-medium uppercase text-sm text-white">{capitalizeFirstChar(folder.title)}</span>
            </div>
        )
    }

    return (
        <img className="rounded-full w-4 h-4 object-cover"
                src={folder?.image?.url}
                alt={folder.image?.alt}
                onError={() => setIsError(true)}
        />
    );
};

export default FolderItemTiny;