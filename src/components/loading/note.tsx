const NoteLoading = () => {
    return (
        <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='w-5 h-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='w-5 h-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='w-5 h-5 bg-black rounded-full animate-bounce'></div>
        </div>
    )
}

export default NoteLoading;