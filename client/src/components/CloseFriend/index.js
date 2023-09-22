import styles from "./styles.module.scss"

export default function CloseFriend({ profilePicture, username }) {
    return (
        <li className={styles.friend}>
            <img className={styles.accountImg}
                src={`${process.env.REACT_APP_BACK_END}${profilePicture}`}
                alt="" />
            <span className={styles.accountName}>{username}</span>
        </li>
    );
}  