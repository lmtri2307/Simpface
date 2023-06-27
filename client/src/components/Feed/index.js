import Post from "../Post";
import Share from "../Share";
import {  useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axiosInstance from "../../api/axios";

function Feed({ username }) {
    const { user } = useAuthContext()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            setPosts(username
                ? (await axiosInstance.get(`post/${username}`)).data
                : (await axiosInstance.get(`post/timeline/all`)).data)
        })()
    }, [username,user])

    const handleShare = useCallback((newPost) => {
        console.log("new Post:", newPost)
        setPosts([newPost, ...posts])
    }, [posts])
    return (<div>
        {(user && username === user.username) && <Share addPost={handleShare} />}
        {posts.map((item) =>
                <Post key={item._id} post={item}></Post>
        )}
    </div>);
}

export default Feed;