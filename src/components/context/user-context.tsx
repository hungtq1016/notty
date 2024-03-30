import { PropsWithChildren, createContext } from "react";
import useUser from '@/utils/hooks/useCurrentUser'
import { TUser } from "@/types/type";
import NoteLoading from "../loading/note";

const UserContext = createContext<TUser>({} as TUser)

const UserProvider = ({ children }:PropsWithChildren) => {

    const { data: user ,isLoading} = useUser();

    if( isLoading || user === undefined) return <NoteLoading />

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }