'use client'
import { classNames } from '@/utils/utils/string.util'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const FileComponent = () => {

    const teams = [
        { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
        { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
        { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
    ]

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="hidden lg:inset-y-0 lg:z-[1] lg:flex lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white duration-700">
                <div className="py-5">
                    <nav className="flex flex-1 flex-col px-6">
                        <ul role="list" className="-mx-2 space-y-1 flex flex-1 flex-col">
                            <li className='py-1'>
                                <div className={classNames(sidebarOpen ? "justify-end" : "justify-center", "flex")}>
                                    <button
                                        onClick={() => setSidebarOpen(!sidebarOpen)}>
                                        <ChevronDoubleLeftIcon className={classNames(
                                            sidebarOpen
                                                ? 'transform rotate-0'
                                                : 'transform -rotate-180',
                                            'h-6 w-6 shrink-0 duration-100 text-gray-700')} />
                                    </button>
                                </div>
                            </li>
                            {teams.map((team) => (
                                <li key={team.name}>
                                    <a
                                        href={team.href}
                                        className={classNames(
                                            team.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                team.current
                                                    ? 'text-indigo-600 border-indigo-600'
                                                    : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                            )}
                                        >
                                            {team.initial}
                                        </span>
                                        <span className={classNames(sidebarOpen ? "" : "sr-only")}>
                                            {team.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default FileComponent;