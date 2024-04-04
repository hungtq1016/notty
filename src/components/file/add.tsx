'use client'
import { PlusIcon } from "@heroicons/react/24/solid"
import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { post } from "@/utils/helpers/request.helper"
import { promiseNotification } from "@/utils/helpers/alert.helper"
import { slugify } from "@/utils/utils/string.util"
import { TFile } from "@/types/type"
import { KeyedMutator } from "swr"
import { FolderContext } from "../context/folder-context"

const FileAdd = ({mutate}:{mutate:KeyedMutator<any>}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('');

    const folder = useContext(FolderContext)

    const toggleSubmit = async() =>{
        await promiseNotification(handleSubmit, 'Uploading...', 'Uploaded', 'Failed')
    }

    const handleSubmit = async () => {

        const payload : TFile = { 
            name: name,
            slug : slugify(name),
            folderId: folder.id,
        }

        await post('/api/file', payload).then(()=>{
            
            mutate()
            setIsOpen(false)
            setName('')
            
        })
    }

    return (
        <>
            <button type="button" onClick={()=>setIsOpen(true)}>
                <PlusIcon className="h-5 w-5 shrink-0 text-gray-700" />
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
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Name</label>
                                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                                placeholder="[file]" required 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className="flex justify-end gap-x-2">
                                                <button type="button" onClick={toggleSubmit}
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

export default FileAdd;