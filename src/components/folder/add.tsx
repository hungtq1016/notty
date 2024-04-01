/* eslint-disable @next/next/no-img-element */
'use client'
import { PlusIcon } from "@heroicons/react/24/solid"
import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { del, post } from "@/utils/helpers/request.helper"
import type { KeyedMutator } from "swr"
import { UploadButton } from "@/utils/utils/uploadthing";
import { XMarkIcon } from "@heroicons/react/24/outline"
import { UserContext } from "../context/user-context"
import { errorNotification, promiseNotification, updateAbleNotification } from "@/utils/helpers/alert.helper"
import { slugify } from "@/utils/utils/string.util"

const FolderAdd = ({mutate}:{mutate:KeyedMutator<any>}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('');
    const [image, setImage] = useState<any>(null)
    const [submit, setSubmit] = useState(false)
    const user = useContext(UserContext);

    const toggleSubmit = async() =>{
        await promiseNotification(handleSubmit, 'Uploading...', 'Uploaded', 'Failed')
    }

    const handleSubmit = async () => {

        const payload = { 
            title: name,
            slug : slugify(name),
            authorId : user.id,
            image:{
                url: image.url, 
                alt:image.key
            }
        }

        await post('/api/folders', payload).then(()=>{
            
            mutate()
            setIsOpen(false)
            setImage(null)
            setName('')
            
        })
    }
    const id = useRef(null)
    const { notify, update } = updateAbleNotification('Uploading...','Upload successfully!',id , 1500);

    return (
        <>
            <button onClick={()=>setIsOpen(!isOpen)}
                className='group w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:rounded-2xl transition-colors'>
                <PlusIcon className="h-6 w-6 shrink-0 text-green-600 group-hover:text-white" />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out durationa-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className="mt-2">
                                        <div
                                        className="max-w-sm mx-auto">
                                            <div className="mb-5">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder Name</label>
                                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                                placeholder="[folder]" required 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="image" className="flex items-center gap-x-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    <span>Image</span>
                                                    {
                                                        image && <button type="button">
                                                        <XMarkIcon className="h-5 w-5 text-red-500" onClick={()=>{
                                                            del('/api/uploadthing/'+image.key)
                                                            setImage(null)
                                                        }} />
                                                    </button>
                                                    }
                                                </label>
                                                {
                                                    image ? <div className=" bg-gray-100 rounded-lg"><img src={image.url} alt="image" className="rounded-lg" /></div>
                                                    :
                                                
                                                    <UploadButton
                                                        className="bg-slate-600"
                                                        endpoint="imageUploader"
                                                        onUploadBegin={notify}
                                                        onClientUploadComplete={(res:any) => {
                                                            update()
                                                            setSubmit(true)
                                                            setImage(res[0])
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            errorNotification(error.message)
                                                            setSubmit(false)
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex justify-end gap-x-2">
                                                <button type="button" disabled={!submit} onClick={toggleSubmit}
                                                className="disabled:text-sky-300 disabled:hover:text-sky-300 disabled:hover:bg-blue-100  inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Submit</button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={()=>setIsOpen(!isOpen)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )


}

export default FolderAdd