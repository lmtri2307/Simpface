import { useNavigate } from "react-router-dom"
import useFriendInfo from "./useFriendInfo"

function useCommentLogic(comment) {
    const { userId, comment: text } = comment
    const {username, profilePicture} = useFriendInfo(userId)
    const navigate = useNavigate()
    
    const onAvatarClick = () => {
        navigate(`/profile/${username}`)
    }
    
    return {
        userName: username,
        commentText: text,
        avatarUrl: profilePicture || "assets/person/noAvatar.png",
        onAvatarClick: onAvatarClick
    };
}

export default useCommentLogic;