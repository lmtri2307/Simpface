import { Remove, Add } from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import UserFriendsList from './UserFriendsList'
import styles from "./styles.module.scss"
import Info from "./Info";
import useProfileInfo from "../../hooks/useProfileInfo";

function ProfileInfo({ username }) {
    const {isFollowed, onFollow} = useProfileInfo(username)

    const {user} = useAuthContext()
    
    return (
        <div className={styles.wrapper}>
            {
                (user && user.username === username)
                    ? <></>
                    : <button
                        className={styles.followBtn}
                        onClick={onFollow}
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
            <UserFriendsList username={username}></UserFriendsList>
        </div>
    );
}

export default ProfileInfo;