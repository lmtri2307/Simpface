import Post from "../Post";
import Share from "../Share";
import { memo } from "react";
import { useAuthContext } from "../../context/authContext";
import useFeed from "../../hooks/useFeed";

const MemoShare = memo(Share)

// "username" is null if is timeline
function Feed({ username }) {
    const {posts, addPost} = useFeed(username)
    
    const { user } = useAuthContext()
    const isCurrnetUser = !username || (user && user.username === username)

    return (<div>
        {isCurrnetUser &&
            <MemoShare user={user} onPost={addPost} />}
        {posts.map((post) =>
            <Post key={post._id} post={post}></Post>
        )}
    </div>)
}
export default Feed;