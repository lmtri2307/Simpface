import Birthday from "./Birthday";
import OnlineUser from "../OnlineUser";
import styles from "./styles.module.scss"
import { useAuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";
import socket from "../../socket/socket";

function Contacts() {
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
        socket.emit("get online users")
        socket.on("get online users", (onlineUsers) => {
            setOnlineUsers(onlineUsers)
        })
        return () => {
            socket.off("get online users")
        }
    }, [])
    const { user } = useAuthContext()
    return (
        <div className={styles.wrapper}>
            <>
                <h4 className={styles.title}>Birthday</h4>
                <Birthday></Birthday>

                <img className={styles.Ad} src={`${process.env.REACT_APP_BACK_END}assets/ad.png`} alt="" />

                <h4 className={styles.title}>Online Friends</h4>
                <ul className={styles.friendlist}>
                    {
                        user.followings.filter(userId => onlineUsers.includes(userId))
                            .map((userId) => (
                                <OnlineUser
                                    key={userId}
                                    userId={userId}
                                    isOnline={true}
                                />
                            ))
                    }
                </ul>
            </>
        </div>
    );
}

export default Contacts;