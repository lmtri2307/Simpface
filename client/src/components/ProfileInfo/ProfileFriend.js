import styles from "./styles.module.scss"
import { Link } from "react-router-dom";
import useFriendInfo from "../../hooks/useFriendInfo";

function ProfileFriend({ friendId }) {
    const { username, profilePicture } = useFriendInfo(friendId)
    return (
        <Link to={`/profile/${username}`} className={styles.userFriendWrapper}>
            <img
                src={`${process.env.REACT_APP_BACK_END}${profilePicture || "assets/person/noAvatar.png"}`}
                alt=""
                className={styles.img}
            />
            <span className={styles.name}>
                {username}
            </span>
        </Link>

    );
}

export default ProfileFriend;