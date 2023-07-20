import styles from "./styles.module.scss"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api"

function AComment({ userId, comment }) {
    const [userName, setUsername] = useState("")
    const avatar = useRef()
    useEffect(() => {
        api.user.getFriendInfo(userId)
            .then(res => {
                setUsername(res.username)
                if (res.profilePicture) {
                    avatar.current.src = process.env.REACT_APP_BACK_END + res.profilePicture
                }
            })
    }, [userId])
    return (
        <div className={styles.aComment} >
            <Link to={`/profile/${userName}`}>
                <img
                    className={styles.accImg}
                    ref={avatar}
                    src={`${process.env.REACT_APP_BACK_END}assets/person/noAvatar.png`}
                    alt=""
                />
            </Link>
            <div>
                <span className={styles.userName}> {userName}</span>
                <br />
                <span className={styles.comment}> {comment}</span>
            </div>
        </div>
    );
}

export default AComment