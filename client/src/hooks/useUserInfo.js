import { useEffect, useState } from "react";
import api from "../api";

function useUserInfo(username) {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        api.user.getUserInfo(username)
            .then(res => setUserInfo(res))
    }, [username])
    return [userInfo, setUserInfo];
}

export default useUserInfo;