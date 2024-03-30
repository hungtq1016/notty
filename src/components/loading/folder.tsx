import LoadingFolderItem from "./folder-item"

export default function LoadingFolderLayout({num = 5}:{num?: number}){
    return (
        <div className="flex flex-col gap-2 animate-pulse py-5 w-14 items-center">
            {Array.from(Array(num).keys()).map((i) => <LoadingFolderItem key={i}/>)}
        </div>
    )
}