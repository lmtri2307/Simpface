import { useEffect, useState } from "react"
import api from "../api"

const useFriendInfo = (userId) => {
    const [info, setInfo] = useState({})
    useEffect(
        () => {
            let isIgnored = false
            const getInfo = async () => {
                const res = await api.user.getFriendInfo(userId)
                if (!isIgnored) setInfo(res);
            }
            getInfo()
            return () => {
                isIgnored = true
            }
        },
        [userId]
    )
    const {username, profilePicture} = info
    return {username, profilePicture};
}

export default useFriendInfo