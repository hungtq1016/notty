import LoadingFileItem from "./file-item";

export default function LoadingFileLayout({num = 5}:{num?: number}) {
    return (
        <div className="flex flex-col gap-2 animate-pulse py-5 bg-gray-50">
            <div className="h-6 bg-gray-100 rounded pb-5"></div>
            {Array.from(Array(num).keys()).map((i) => <LoadingFileItem key={i}/>)}
        </div>
    )
}