import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

function ProfileFriend({friendId}) {
    const imgRef = useRef()
    const accRef = useRef()
    const [link, setLink] = useState("")
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${friendId}/asfriend`)
        .then(res => {
            imgRef.current.src = process.env.REACT_APP_BACK_END + res.data.profilePicture
            accRef.current.textContent = res.data.username
            setLink(`/profile/${res.data.username}`)
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