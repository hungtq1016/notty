/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import { TFolder } from '@/types/type';


const FolderItemTiny = (props:TFolder) => {

    const [isError, setIsError] = React.useState(false);

    if (isError) {
        return (
            <div className="w-4 h-4 flex items-center justify-center rounded-full ">
                <span className="shrink-0 font-medium uppercase text-sm text-white">{props?.title[0]}</span>
            </div>
        )
    }

    return (
        <img className="rounded-full w-4 h-4 object-cover"
                src={props?.image?.url}
                alt={props.image?.alt}
                onError={() => setIsError(true)}
        />
    );
};

export default FolderItemTiny;