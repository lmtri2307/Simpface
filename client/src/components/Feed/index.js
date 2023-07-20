import Post from "../Post";
import Share from "../Share";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import api from "../../api"

function Feed({ username }) {
    const { user } = useAuthContext()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            const newPosts = username
                ? await api.post.getPostOfUser(username)
                : await api.post.getTimelinePost()

            console.log("newPosts:", newPosts)
            if (newPosts) {
                setPosts(newPosts)
            }
        })()
    }, [username, user])

    const handleShare = useCallback((newPost) => {
        setPosts([newPost, ...posts])
    }, [posts])
    const isCurrnetUser = !username || (user && user.username === username)
    return (<div>
        {isCurrnetUser && <Share addPost={handleShare} />}
        {posts.map((item) =>
            <Post key={item._id} post={item}></Post>
        )}
    </div>);
}

export default Feed;