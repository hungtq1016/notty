/* eslint-disable @next/next/no-img-element */
import useCurrentUser from "@/utils/hooks/use-current-user";
import { redirect } from "next/navigation";

const UserAvatar = () => {
    const { data, isLoading, error } = useCurrentUser()

    if (isLoading || error || data === undefined) redirect("/")

    return (
        <div className="flex items-center justify-center rounded-full">
            <div className="flex items-center">
                <div className="flex items-center">
                    <img
                        src={data?.image} alt="avatar" className="w-12 h-12 rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default UserAvatar;