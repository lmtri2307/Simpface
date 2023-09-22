import styles from "./styles.module.scss"
import useUser from "../../hooks/useUser";

function OnlineUser({isOnline, userId }) {
    const user = useUser(userId)
    return (
        <li className={styles.wrapper}>
            <div className={styles.onlineImg}>
                <img className={styles.accImg} src={`${process.env.REACT_APP_BACK_END}${user.profilePicture}`} alt="" />

                {isOnline &&
                    <span className={styles.onlineIcon}></span>
                }
            </div>
            <span className={styles.username}>{user.username}</span>
        </li>
    );
}

export default OnlineUser