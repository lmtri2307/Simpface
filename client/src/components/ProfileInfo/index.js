import { Remove, Add} from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import UserFriendsList from './UserFriendsList'
import styles from "./styles.module.scss"
import Info from "./Info";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

function ProfileInfo({ username }) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [followings, setFollowings] = useState([])
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${username}/isFollowed`)
            .then(res => setIsFollowed(res.data))

        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${username}/followings`)
            .then(res => {
                setFollowings(res.data)
            })
    }, [username])


    const handleFollow = () => {
        if (!user) {
            navigate('/auth')
            return
        }
        if (isFollowed) {
            axiosInstance.put(`${process.env.REACT_APP_BACK_END}users/${username}/unfollow`)
                .then(res => setIsFollowed(prev => !prev))
        } else {
            axiosInstance.put(`${process.env.REACT_APP_BACK_END}users/${username}/follow`)
                .then(res => {
                    setIsFollowed(prev => !prev)
                    const newFollowings = [...user.followings, res.data]
                    setUser({ ...user, followings: newFollowings })
                })
        }
    }
    return (
        <div className={styles.wrapper}>
            {
                (user && user.username === username)
                    ? <></>
                    : <button
                        className={styles.followBtn}
                        onClick={handleFollow}
                    >
                        {
                            (user && isFollowed)
                                ? <>Unfollow < Remove /> </>
                                : <>Follow < Add /></>
                        }
                    </button>
            }
            <h4 className={styles.title}>User information</h4>
            <Info username={username}/>
            <h4 className={styles.title}>User friends</h4>
            <UserFriendsList friends={followings}></UserFriendsList>
        </div>
    );
}

export default ProfileInfo;