import styles from "./styles.module.scss"

function UserSearchResult({ profilePicture, username, onClick }) {
    return (
        <div to={`/profile/${username}`} className={styles.result} onClick={onClick}>
            <img src={`${process.env.REACT_APP_BACK_END}${profilePicture}`} alt="" />
            <div className={styles.info}>
                <span className={styles.accountName}> {username} </span>
            </div>
        </div>
    );
}

export default UserSearchResult;