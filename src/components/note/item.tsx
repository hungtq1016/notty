'use client'
import { TNote } from '@/types/type';
import React, { useRef, useState } from 'react';
import NoteDelete from './delete';
import ConfirmDelete from './delete';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { post } from '@/utils/helpers/request.helper';

function NoteItem({props, onAction}:{props: TNote, onAction: () => void}) {

    const [note, setNote] = useState<TNote>(props);

    const contentRef = useRef<HTMLDivElement>(null);

    const handleSave = useDebounce((note:TNote) => {
        console.log(note)
        post('/api/notes', note)
    }, 1000);

    const handleEdit = () => {
        setNote({...note, title: contentRef.current?.querySelector('h2')?.innerText } as TNote);
        setNote({...note, content: contentRef.current?.querySelector('p')?.innerText } as TNote);
        handleSave(note)
    }

    const colors = ['#ff7eb9','#ff65a3','#7afcff','#feff9c','#fff740','#46c45a','#92daff','#7f4daf','#ffa6c1','#165caf']

    return (
        <li className='relative hover:!z-[999]' style={{ transform: `rotate(${Math.floor(Math.random() * 30) - 15}deg)`,zIndex: Math.floor(Math.random() * 49) }}>
            <div style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)], marginTop: Math.floor(Math.random() * 20)}}
            className='text-black block w-64 h-64 p-4 shadow-lg transform rotate-6 hover:scale-125 hover:z-5 transition-transform duration-150 relative'
                suppressContentEditableWarning={true}
                contentEditable  onBlur={handleEdit} ref={contentRef} >
                <ConfirmDelete id={String(props.id)} onAction={onAction}/>   
                <h2 className='font-bold text-3xl'>{note.title}</h2>
                <p className='font-["Reenie_Beanie"]'>{note.content}</p>
            </div>
        </li>
    );
}

export default NoteItem;
