import FolderItem from './item'
import Link from 'next/link'
import FolderAdd from './add'
import useFolders from '@/utils/hooks/useFolders'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import UserAvatar from '../user/avatar'
import LoadingVerticalItem from '../loading/vertical-item'
import FolderMe from './me'
import { TDynamic, TFolder } from '@/types/type'
import FolderGroup from './group'

const FolderComponent = () => {
    const user = useContext(UserContext);
    
    const { data: folders, isLoading, mutate ,error} = useFolders({authorId: user})

    if (isLoading || error) {
        return <LoadingVerticalItem/>
    }

    const groups: TDynamic<TFolder[]> = {};
        
    folders?.forEach((item:TFolder) => {
        if (!groups[item.group?.name]) {
            groups[item.group?.name] = [];
        }
        groups[item.group?.name].push(item);
    });
        
    const sortedData = Object.keys(groups).map(group => groups[group]);

    console.table(folders)
    console.log(sortedData)
      
    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex grow flex-col gap-y-5">
                <div className="py-5">
                    <nav className="flex flex-1 flex-col px-4">
                        <ul role="list" className="-mx-2 space-y-1 flex flex-1 flex-col" >
                            <li><FolderMe /></li>
                            {
                                sortedData?.map((folders:TFolder[],index:number) => (
                                    folders[0].group === null ?
                                    folders.map((folder:TFolder,index:number) => (
                                        <li key={index}>
                                            <FolderItem
                                                {...folder}
                                            />
                                        </li>
                                    ))
                                    :
                                    <FolderGroup folders={folders} key={index}/>
                                ))
                            }
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