import { useEffect, useState } from "react";
import api from "../api";

function useUser(userId) {
    const [user, setUser] = useState({})
    useEffect(() => {
        api.user.getUser(userId)
            .then((user) => setUser(user))
    }, [userId])
    return user;
}

export default useUser;