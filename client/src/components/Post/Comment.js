import styles from "./styles.module.scss"
import useCommentLogic from "../../hooks/useCommentLogic"

function Comment({ comment }) {
    const {userName, commentText, avatarUrl, onAvatarClick} = useCommentLogic(comment)

    return (
        <div className={styles.aComment} >
            <img
                className={styles.accImg}
                src={process.env.REACT_APP_BACK_END + avatarUrl}
                alt=""
                onClick={onAvatarClick}
            />
            <div>
                <span className={styles.userName}> {userName}</span>
                <br />
                <span className={styles.comment}> {commentText}</span>
            </div>
        </div>
    );
}

export default Comment