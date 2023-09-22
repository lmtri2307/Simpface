import { useEffect, useState } from "react"
import { useAuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import api from "../api"

function useProfileInfo(username) {
    const [isFollowed, setIsFollowed] = useState(false)

    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        api.user.checkFollowedUser(username)
            .then(isFollowed => {
                setIsFollowed(isFollowed)
            })
    }, [username])


    const onFollow = () => {
        if (!user) {
            navigate('/auth')
            return
        }

        if (isFollowed) {
            api.user.unfollowUser(username)
                .then(res => setIsFollowed(prev => !prev))
        } else {
            api.user.followUser(username)
                .then(res => {
                    setIsFollowed(prev => !prev)
                    const newFollowings = [...user.followings, res]
                    setUser({ ...user, followings: newFollowings })
                })
        }
    }

    return {isFollowed, onFollow};
}

export default useProfileInfo;