import { TFile } from "@/types/type";
import { capitalizeFirstChar, classNames, hrefBuilder } from "@/utils/utils/string.util";
import Link from "next/link";
import { useParams } from "next/navigation";
import FileItemDropdown from "./dropdown";

const FileItem = ({ file }: { file: TFile }) => {

    const params = useParams<{ folder: string; file: string }>();
    const isActived = params.file === file.slug;

    return (
        <div className="group flex gap-x-1 justify-between items-center">
            <Link href={hrefBuilder([params.folder, file.slug])}
                className={classNames(
                    isActived
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex flex-1 gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}
            >
                <span
                    className={classNames(
                        isActived
                            ? 'text-indigo-600 border-indigo-600'
                            : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                    )}
                >
                    {capitalizeFirstChar(file.name)}
                </span>

                <span>{file.name}</span>
            </Link>
            <FileItemDropdown className="group-hover:inline hidden" />
        </div>
    );
}

export default FileItem;