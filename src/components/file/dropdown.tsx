import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { TrashIcon as TrashIconSolid, Cog6ToothIcon as Cog6ToothIconSolid, PencilIcon as PencilIconSolid } from '@heroicons/react/24/solid'
import { Cog6ToothIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function FileItemDropdown({className}:{className?:string}) {

    type TFileItemDropdown = {
        name: string
        icon: React.FC<React.SVGProps<SVGSVGElement>>
        iconSolid: React.FC<React.SVGProps<SVGSVGElement>>
        action : () => void
    }
    const options : TFileItemDropdown[] = [
        { name: 'Edit', icon: PencilIcon, iconSolid: PencilIconSolid , action: () => console.log('Edit')},
        { name: 'Delete', icon: TrashIcon, iconSolid: TrashIconSolid, action: () => console.log('Delete')},
    ]

    return (
        <div className={className}>
            <Menu as="div" className="relative flex">
                <Menu.Button className="flex items-center flex-1">
                    {
                        ({ open }) => (
                            open ? <Cog6ToothIconSolid className='h-5 w-5 text-gray-600 rotate-45' /> : <Cog6ToothIcon className='h-5 w-5 text-gray-600' />
                        )
                    }
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute translate-y-full bottom-0 z-10 right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {
                                options.map((option, index) => (
                                    <Menu.Item key={index}>
                                        {({ active }) => (
                                            <button onClick={option.action}
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                    <option.iconSolid
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"/>
                                                ) : (
                                                    <option.icon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                {option.name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
