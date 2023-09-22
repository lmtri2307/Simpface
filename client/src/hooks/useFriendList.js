import { useEffect, useState } from "react";
import api from "../api";

function useFriendList(username) {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        api.user.getFollowingsOfUser(username)
            .then(friends => setFriends(friends))
    }, [username])

    return friends
}

export default useFriendList;