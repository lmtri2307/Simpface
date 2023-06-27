import styles from "./styles.module.scss"

export default function CloseFriend({ user }) {
    return (
        <li className={styles.friend}>
            <img className={styles.accountImg}
                src={`${process.env.REACT_APP_BACK_END}${user.profilePicture}`}
                alt="" />
            <span className={styles.accountName}>{user.username}</span>
        </li>
    );
}  