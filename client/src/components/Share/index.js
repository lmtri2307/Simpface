import { memo, useRef, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import styles from "./styles.module.scss";
import { PermMedia, Label, Room, EmojiEmotions, Cancel, } from "@mui/icons-material"
import api from "../../api";

function Share({ addPost }) {
    const { user } = useAuthContext()

    const statusInput = useRef()
    const [file, setFile] = useState()

    const handlePost = async (e) => {
        try {
            e.preventDefault()
            if (!file && !statusInput.current.value) {
                alert("Nothing to post")
                return
            }
            await api.post.createPost(file, statusInput.current.value)
                .then((res) => {
                    statusInput.current.value = ""
                    setFile(null)
                    addPost(res)
                })
        } catch (error) {
            alert("Upload fail")
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.status}>
                <img className={styles.accountImg}
                    src={process.env.REACT_APP_BACK_END + user.profilePicture}
                    alt="" />
                <input
                    ref={statusInput}
                    placeholder={`What's in your mind ${user.username} ?`}
                    className={styles.statusText}
                />
            </div>
            <hr className={styles.hr} />
            {file && (
                <div className={styles.shareImgContainer}>
                    <img className={styles.shareImg} src={URL.createObjectURL(file)} alt="" />
                    <Cancel className={styles.shareCancelImg} onClick={() => setFile(null)} />
                </div>
            )}
            <div className={styles.buttons}>
                <div className={styles.options}>
                    <label htmlFor="file" className={styles.option}>
                        <PermMedia htmlColor="tomato" className={styles.icon} />
                        <span>Photo or Video</span>
                    </label>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className={styles.option}>
                        <Label htmlColor="blue" className={styles.icon} />
                        <span>Tag</span>
                    </div>
                    <div className={styles.option}>
                        <Room htmlColor="green" className={styles.icon} />
                        <span>Location</span>
                    </div>
                    <div className={styles.option}>
                        <EmojiEmotions htmlColor="goldenrod" className={styles.icon} />
                        <span>Feelings</span>
                    </div>
                </div>
                <button onClick={handlePost} className={styles.shareButton}>Share</button>
            </div>
        </div>
    );
}
export default memo(Share)