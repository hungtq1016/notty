export default function LoadingItem() {
    return (
        <div className="group">
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-sky-600 group-hover:rounded-2xl transition-opacity animate-pulse'>
                <span className="shrink-0 text-black group-hover:text-white font-medium" >...</span>
            </div>
        </div>
    )
}