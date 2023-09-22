import { useCallback, useEffect, useState } from "react"
import api from "../api"
import { useAuthContext } from "../context/authContext"

function usePost(post) {
    const [comments, setComments] = useState(post.comments)
    const {user} = useAuthContext()
    useEffect(() => {
        if(user.username === post.user.username){
            post.user.profilePicture = user.profilePicture
        }
    }, [post.user, user.username, user.profilePicture])
    const addComment = useCallback(async (newComment) => {
        const res = await api.post.commentPost(post._id, newComment)
        setComments(prev => [...prev, res])
    }, [post._id])

    return { postData: { ...post, comments }, addComment };
}

export default usePost;