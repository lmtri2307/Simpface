import { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import api from "../../api"

function OnlineUser({isOnline, userId }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        api.user.getUser(userId)
            .then(res => setUser(res))
    }, [userId])
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