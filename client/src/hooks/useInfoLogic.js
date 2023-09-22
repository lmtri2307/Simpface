import api from "../api";
import { useAuthContext } from "../context/authContext";
import useUserInfo from "./useUserInfo";

function useInfoLogic(username) {
    const [userInfo, setUserInfo] = useUserInfo(username)

    const onSubmit = async (userInfo) => {
        api.user.updateInfo(username, userInfo)
            .then(res => {
                setUserInfo(res)
            })
    }

    const { user } = useAuthContext()
    const isCurrentUser = user && user.username === username
    
    return { userInfo, onSubmit, isCurrentUser };
}

export default useInfoLogic;