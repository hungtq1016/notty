'use client'
import React from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { classNames } from '@/utils/utils/string.util';

interface ImageWithFallbackProps {
    src: string;
    [key: string]: any;
}

const ImgFallBack: React.FC<ImageWithFallbackProps> = (props) => {
    const { src, ...rest } = props;
    const [isError, setIsError] = React.useState(false);
    const pathName = usePathname();

    const isActived = pathName.startsWith("/pipe/"+props.slug);

    return (
        <Link href={props.slug} className="group has-tooltip">
            {
                isError ?
                    (<div className={classNames(isActived ? "bg-sky-600 rounded-2xl":"bg-white group-hover:bg-sky-600 group-hover:rounded-2xl rounded-full " ,"w-12 h-12 flex items-center justify-center  transition-opacity")}>
                        <span className={classNames(isActived ? "text-white":"text-black group-hover:text-white","shrink-0 font-medium uppercase")} >{props?.title[0]}</span>
                    </div>)
                    :
                    <Image
                        {...rest}
                        className={classNames(isActived ? "rounded-2xl":"rounded-full")}
                        src={"/" + src}
                        alt={props.title}
                        onError={() => setIsError(true)}
                    />
            }
            <span className='tooltip rounded shadow-lg p-1 bg-white text-black ml-14 -translate-y-full text-sm font-light capitalize'>{props.title}</span>
        </Link>
    );
};

export default ImgFallBack;