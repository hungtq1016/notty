'use client'
import { useContext, useEffect, useState } from 'react';
import { FileContext } from '../context/file-context';
import NoteItem from './item';
import { uuid } from 'uuidv4'
import NoteLoading from '../loading/note';
import { TNote } from '@/types/type';
import { post } from '@/utils/helpers/request.helper';
import { PlusIcon } from '@heroicons/react/24/solid';
import useFetch from '@/utils/hooks/use-fetch';
import { useParams } from 'next/navigation'

function NoteComponent() {

    const file = useContext(FileContext);
    const params = useParams<{ file: string }>();

    const { data, isLoading, error, isValidating, mutate } = useFetch<TNote[]>("/api/note",{ fileId: file.id });

    const [notes, setNotes] = useState<TNote[] | undefined>(data);

    useEffect(() => {
        setNotes(data);
    }, [data])

    useEffect(() => {
        mutate();
    }, [params.file])

    if (isLoading || error || notes === undefined || isValidating) return <NoteLoading />

    const addNote = () => {
        const init: TNote = {
            title: "Title",
            content: "content",
            color: '#fde68a',
            prioritize : false,
            fileId: file.id,
            id: uuid(),
        }
        setNotes([...notes, init])
        post('/api/note', init)
    }

    if (notes.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-2">
                <span className='text-center text-gray-500 '>No notes found</span>
                <button className='px-4 py-1 rounded bg-sky-100 text-sky-600' onClick={addNote}>
                    Add Note
                </button>
            </div>
        )
    }

    const removeNote = (index: number) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    }

    return (
        <div className="py-5 h-screen ">
            <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center'>
                {notes.map((item, index) => (
                    <NoteItem key={index} note={item} onDelete={()=>removeNote(index)}/>
                ))}
                <li className='h-full flex items-center justify-center'>
                    <button className='bg-sky-100 p-1 rounded-full' onClick={addNote}>
                        <PlusIcon className='w-5 h-5 text-sky-600' />
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NoteComponent;
