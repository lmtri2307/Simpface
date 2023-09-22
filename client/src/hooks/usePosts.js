import { useEffect, useState } from "react"
import api from "../api"

const usePosts = (username) => {
    const [posts, setPosts] = useState([])
    useEffect(
        () => {
            let isIgnored = false

            const getPosts = async () => {
                const res = username
                    ? await api.post.getPostOfUser(username)
                    : await api.post.getTimelinePost();
                if (!isIgnored) setPosts(res);
            }
            getPosts()
            return () => {
                isIgnored = true
            }
        },
        [username]
    )

    return [posts, setPosts];
}

export default usePosts