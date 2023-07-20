import { Remove, Add } from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import UserFriendsList from './UserFriendsList'
import styles from "./styles.module.scss"
import Info from "./Info";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function ProfileInfo({ username }) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [followings, setFollowings] = useState([])
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        api.user.checkFollowedUser(username)
            .then(res => {
                console.log("checkFollowedUser response:", res)
                setIsFollowed(res)
            })

        api.user.getFollowingsOfUser(username)
            .then(res => {
                setFollowings(res)
            })
    }, [username])


    const handleFollow = () => {
        if (!user) {
            navigate('/auth')
            return
        }
        if (isFollowed) {
            api.user.unfollowUser(username)
                .then(res => setIsFollowed(prev => !prev))
        } else {
            api.user.followUser(username)
                .then(res => {
                    setIsFollowed(prev => !prev)
                    const newFollowings = [...user.followings, res]
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
            <Info username={username} />
            <h4 className={styles.title}>User friends</h4>
            <UserFriendsList friends={followings}></UserFriendsList>
        </div>
    );
}

export default ProfileInfo;