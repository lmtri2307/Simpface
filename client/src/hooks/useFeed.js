import { useCallback } from "react";
import usePosts from "./usePosts";

function useFeed(username) {
    const [posts, setPosts] = usePosts(username)

    const addPost = useCallback((newPost) => {
        setPosts(prev => [newPost, ...prev])
    }, [setPosts])

    return {posts, addPost};
}

export default useFeed;