'use client'
import React, { useContext, useEffect, useState } from 'react';
import { FileContext, FileProvider } from '../context/file-context';
import NoteItem from './item';
import useNotes from '@/utils/hooks/useNotes';
import NoteLoading from '../loading/note';
import { TNote } from '@/types/type';
import { post } from '@/utils/helpers/request.helper';

function NoteComponent() {

    const file = useContext(FileContext);

    const { data, isLoading, error, isValidating } = useNotes({ fileId: file.id });

    const [notes, setNotes] = useState<TNote[] | undefined>(data);

    useEffect(() => {
        setNotes(data);
    }, [data])

    if (isLoading || error || notes === undefined || isValidating) return <NoteLoading />

    const AddNote = () => {
        const init: TNote = {
            title: "Title",
            content: "content",
            color: '#fde68a',
            prioritize : false,
            fileId: file.id,
            updatedAt: new Date().toISOString(),
        }
        setNotes([...notes, init])
        post('/api/notes', init)
    }

    if (notes.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-2">
                <span className='text-center text-gray-500 '>No notes found</span>
                <button className='px-4 py-1 rounded bg-sky-100 text-sky-600' onClick={AddNote}>
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
        <div className="py-5">
            <ul className='w-full h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {notes.map((item, index) => (
                    <NoteItem key={index} {...item}/>
                ))}
            </ul>
        </div>
    );
}

export default NoteComponent;
