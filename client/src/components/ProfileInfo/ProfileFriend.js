import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import { Link } from "react-router-dom";
import api from "../../api";

function ProfileFriend({ friendId }) {
    const imgRef = useRef()
    const accRef = useRef()
    const [link, setLink] = useState("")
    useEffect(() => {
        api.user.getFriendInfo(friendId)
            .then(res => {
                imgRef.current.src = process.env.REACT_APP_BACK_END + res.profilePicture
                accRef.current.textContent = res.username
                setLink(`/profile/${res.username}`)
            })
    }, [friendId])
    return (
        <Link to={link} className={styles.userFriendWrapper}>
            <img
                src={`${process.env.REACT_APP_BACK_END}assets/person/noAvatar.png`}
                alt=""
                className={styles.img}
                ref={imgRef}
            />
            <span className={styles.name}
                ref={accRef}
            >
            </span>
        </Link>

    );
}

export default ProfileFriend;