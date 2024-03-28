import FolderItem from './item'
import Link from 'next/link'
import FolderAdd from './add'
import useFolders from '@/utils/hooks/useFolders'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import UserAvatar from '../user/avatar'
import LoadingVerticalItem from '../loading/vertical-item'
import FolderMe from './me'

const FolderComponent = () => {
    const user = useContext(UserContext);
    
    const { data: folders, isLoading, mutate ,error} = useFolders({authorId: user})

    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto">
                <div className="py-5">
                    <nav className="flex flex-1 flex-col px-4">
                        <ul role="list" className="-mx-2 space-y-1 flex flex-1 flex-col">
                            <li><FolderMe /></li>
                            {
                                isLoading || error ? <li><LoadingVerticalItem num={6}/></li>
                            :
                            folders.map((folder:any) => (
                                <li key={folder.title}>
                                    <Link
                                        href={folder.slug}
                                        className="w-12 h-12 bg-white rounded-full">
                                        <FolderItem key={folder.title} 
                                         src={folder.image}
                                         width={48}
                                         height={48}
                                         {...folder}
                                         />
                                       
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <FolderAdd mutate={mutate}/>
                            </li>
                        </ul>
                        
                    </nav>
                </div>
            </div>
            <UserAvatar/>
        </div>
    )
}

export default FolderComponent;