import { useContext } from 'react';

import {
  TDynamic,
  TFolder,
} from '@/types/type';
import useFolders from '@/utils/hooks/use-folders';

import { UserContext } from '../context/user-context';
import LoadingFolderLayout from '../loading/folder';
import UserAvatar from '../user/avatar';
import FolderAdd from './add';
import FolderGroup from './group';
import FolderItem from './item';
import FolderMe from './me';

'use client '

const FolderComponent = () => {
    
    const user = useContext(UserContext);

    const { data, isLoading, mutate, error } = useFolders({ authorId: user.id })

    if (isLoading || error || data === undefined) {
        return <LoadingFolderLayout />
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 w-14">
            <div className="flex grow flex-col gap-y-5 w-12">
                <div className="py-5">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="gap-y-1 flex flex-1 flex-col justify-between" >
                            <li><FolderMe /></li>
                            {
                                FormatData(data).map((items: TFolder[], index: number) => (
                                    <li key={index}>
                                        {
                                            items[0].group === null ?
                                                <FolderItem {...items[0]} />
                                                :
                                                <FolderGroup folders={items} />
                                        }
                                    </li>
                                ))
                            }
                            <li><FolderAdd mutate={mutate} /></li>
                        </ul>

                    </nav>
                </div>
            </div>
            <UserAvatar />
        </div>
    )
}

const FormatData = (arr: TFolder[]) => {

    const groups: TDynamic<TFolder[]> = {};

    arr?.forEach((item: TFolder) => {
        if (item.group === null) {
            groups[item.title] = [item];
        } else {
            if (!groups[item.group.name]) {
                groups[item.group.name] = [];
            }

            groups[item.group.name].push(item);
        }
    });

    return Object.keys(groups).map(group => groups[group]);
}

export default FolderComponent;