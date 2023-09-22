import Birthday from "./Birthday";
import OnlineUser from "../OnlineUser";
import styles from "./styles.module.scss"
import useOnlineFriends from "../../hooks/useOnlineFriends";

function Contacts() {
    const onlineFriends = useOnlineFriends()

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Birthday</h4>
            <Birthday></Birthday>

            <img className={styles.Ad} src={`${process.env.REACT_APP_BACK_END}assets/ad.png`} alt="" />

            <h4 className={styles.title}>Online Friends</h4>
            <ul className={styles.friendlist}>
                {
                    onlineFriends.map((userId) => (
                        <OnlineUser
                            key={userId}
                            userId={userId}
                            isOnline={true}
                        />
                    ))
                }
            </ul>
        </div>
    );
}

export default Contacts;