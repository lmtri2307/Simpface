import styles from "./styles.module.scss"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosInstance from "../../api/axios"

function AComment({ userId, comment }) {
    const [userName, setUsername] = useState("")
    const avatar = useRef()
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${userId}/asfriend`)
            .then(res => {
                setUsername(res.data.username)
                if (res.data.profilePicture) {
                    avatar.current.src = process.env.REACT_APP_BACK_END + res.data.profilePicture
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