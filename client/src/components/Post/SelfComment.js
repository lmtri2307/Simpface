import styles from "./styles.module.scss"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"
import { useEffect, useRef } from "react"
import SendIcon from '@mui/icons-material/Send';
import clsx from "clsx";

function SelfComment({ handleComment }) {
    const { user } = useAuthContext()
    const myComment = useRef()

    useEffect(() => {
        myComment.current.focus()
    },[])
    

    return (
        <div style={{ borderTop: "1px solid black", boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)" }}>
            <div className={styles.myComment}>
                <Link to={`/profile/${user.username}`}>
                    <img
                        className={styles.accImg}
                        src={process.env.REACT_APP_BACK_END + user.profilePicture}
                        alt=""
                    />
                </Link>
                <input
                    ref={myComment}
                    placeholder="Viết bình luận ..." 
                    type="text"
                />
                <button
                    disabled={myComment === ""}
                    className={clsx(styles.sendButton, {
                        [styles.active]: myComment !== ""
                    })}
                    onClick={e => {
                        handleComment(myComment.current.value).then(() => {
                            // setMyComment("")
                            myComment.current.value = ""
                        })
                    }}>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

export default SelfComment