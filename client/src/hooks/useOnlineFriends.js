import { useAuthContext } from "../context/authContext"
import useOnlineUsers from "./useOnlineUsers"

export default function useOnlineFriends() {
    const onlineUsers = useOnlineUsers()
    const { user } = useAuthContext()

    return filterOnlineFriend(onlineUsers, user.followings)
}

function filterOnlineFriend(onlineUsers, friends){
    return friends.filter(userId => onlineUsers.includes(userId))
}