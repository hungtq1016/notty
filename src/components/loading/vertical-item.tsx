import LoadingItem from "./item"

export default function LoadingVerticalItem({num = 5}:{num?: number}){
    return (
        <div className="flex flex-col gap-2 animate-pulse">
            {Array.from(Array(num).keys()).map((i) => <LoadingItem key={i}/>)}
        </div>
    )
}