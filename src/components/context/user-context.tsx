import { PropsWithChildren, createContext } from "react";
import useUser from '@/utils/hooks/useCurrentUser'

const UserContext = createContext("id")

const UserProvider = ({ children }:PropsWithChildren) => {
    const { data: user ,isLoading} = useUser();

    if(isLoading) return <div>Loading...</div>

    return (
        <UserContext.Provider value={user?.id}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }