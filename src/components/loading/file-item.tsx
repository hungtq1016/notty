import { PhotoIcon } from "@heroicons/react/20/solid";

export default function LoadingFileItem(){
    return (
        <div className="group">
            <div className="flex gap-x-1">
                <div className="bg-gray-200 p-1 rounded">
                    <PhotoIcon className="h-5 w-5 text-gray-400 "/>
                </div>
                <div className="flex-1 h-7 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}