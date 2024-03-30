import { classNames, hrefBuilder } from "@/utils/utils/string.util";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FolderMe() {

    const params = useParams<{ folder: string }>();
    const isActived = params.folder === 'me';

    return (
        <Link href={hrefBuilder(["me"])} className="group">
            <div className={classNames(isActived ? "bg-sky-600 rounded-2xl":"bg-white group-hover:bg-sky-600 group-hover:rounded-2xl rounded-full " ,"w-12 h-12 flex items-center justify-center  transition-opacity")}>
                <span className={classNames(isActived ? "text-white":"text-black group-hover:text-white","shrink-0   font-medium")} >@</span>
            </div>
        </Link>
    )
}