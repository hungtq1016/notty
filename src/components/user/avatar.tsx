import useCurrentUser from "@/utils/hooks/useCurrentUser";
import Image from "next/image";

const UserAvatar = () => {
    const {data,isLoading} = useCurrentUser()

    if(isLoading) return <div>Loading...</div>

    return (
        <div className="flex items-center justify-center rounded-full">
            <div className="flex items-center">
                <div className="flex items-center">
                    <img 
                    src={data?.image} alt="avatar" className="w-12 h-12 rounded-full"/>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar;