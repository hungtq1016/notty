import { TNote } from "@/types/type";
import { useContext, useReducer, useState } from "react";
import { format } from 'date-fns'
import InputColor from 'react-input-color';
import { del, put } from "@/utils/helpers/request.helper";
import { FileContext } from "../context/file-context";
import { StarIcon } from "@heroicons/react/20/solid";

function NoteItem({ note, onDelete }: { note: TNote, onDelete: () => void }) {

    const [isEditable, setEditable] = useState(false);
    const file = useContext(FileContext);

    const [event, setEvent] = useReducer((prev: TNote, next: Partial<TNote>) => {
        const newEvent = { ...prev, ...next };

        if (newEvent.color === '') {
            newEvent.color = '#fde68a'
        }

        return newEvent
    }, {
        id: note.id,
        title: note.title,
        content: note.content,
        color: note.color,
        prioritize: note.prioritize,
        fileId: file.id,
        updatedAt: note.updatedAt,
    })

    const edit = async () => {
        await put('/api/note/' + event.id, event)
        setEditable(false)
    }

    const remove = async () => {
        onDelete()
        await del('/api/note/' + event.id, event)
    }

    return (
        <li>
            <div style={{ backgroundColor: event.color }}
                className='rounded-lg shadow-lg p-4 m-2 relative'>
                <div className='flex justify-between flex-wrap'>
                    {
                        isEditable ? (
                            <input className="w-full bg-transparent/10"
                                onChange={(e) => setEvent({ title: e.target.value })}
                                type="text" value={event.title} />
                        ) : (
                            <>
                                <span className='text-4xl font-jah capitalize truncate'>{event.title}</span>
                                <span className='text-xs '>{format(event.updatedAt ?? new Date(), 'MM/dd/yyyy')}</span>
                            </>
                        )
                    }

                </div>
                <div className='overflow-y-auto mt-1'>
                    {
                        isEditable ? (
                            <textarea className="w-full bg-transparent/10 resize-none"
                                onChange={(e) => setEvent({ content: e.target.value })}
                                value={event.content}></textarea>
                        ) : (
                            <p className="font-handlee">{event.content}</p>
                        )
                    }
                </div>
                {
                    isEditable && (
                        <div className='mt-1 flex gap-1'>
                            <input id="prioritize" type="checkbox" checked={event.prioritize} onChange={(e) => setEvent({ prioritize: e.target.checked })} />
                            <label htmlFor="prioritize">Prioritize</label>
                        </div>
                    )
                }
                <div className='flex justify-between mt-4'>
                    {
                        isEditable && <span className='text-xs'><InputColor
                            initialValue={note.color}
                            onChange={(e) => setEvent({ color: e.hex })}
                            placement="right"
                        /></span>
                    }
                    <div className='flex gap-2'>

                        {
                            isEditable ? (
                                <>
                                    <button onClick={() => setEditable(false)}
                                        className='text-xs'>Cancel</button>
                                    <button onClick={edit}
                                        className='text-xs'>Save</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={remove}
                                        className='text-xs'>Delete</button>

                                    <button onClick={() => setEditable(true)}
                                        className='text-xs'>Edit</button>
                                </>
                            )
                        }
                    </div>
                </div>
                {(event.prioritize && !isEditable) && <div className="absolute bottom-1 right-1 inline-block p-1 rounded-full bg-black">
                    <StarIcon className="h-5 w-5 text-white" />
                </div>}
            </div>
        </li>
    );
}

export default NoteItem;
