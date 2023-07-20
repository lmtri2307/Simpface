import { memo} from "react";
import styles from "./styles.module.scss"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useAuthContext } from "../../context/authContext";
import api from "../../api"

function Cover({ profile, cover, editable }) {
    const { user, updateProfile, updateCover } = useAuthContext()
    // const coverRef = useRef()
    // const avatarRef = useRef()
    const handlePictureChange = async (e) => {
        const nameOfImg = e.target.getAttribute('name')
        const pictureFile = e.target.files[0]

        api.user.changePicture(user._id, nameOfImg, pictureFile)
            .then(res => {
                // const newSrc = `${process.env.REACT_APP_BACK_END}${res.data}`
                if (nameOfImg === "Cover") {
                    // coverRef.current.src = newSrc
                    updateCover(res)
                } else {
                    // avatarRef.current.src = newSrc
                    updateProfile(res)
                }
            })
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.coverUserImgWrapper}>
                <img

                    className={styles.profileCoverImg}
                    src={`${process.env.REACT_APP_BACK_END}${cover}`}
                    alt=""
                    // ref={coverRef}
                />
                {editable
                    && <>
                        <label htmlFor="coverInput" className={styles.editIcon}>
                            <CameraAltIcon />
                        </label>
                        <input
                            name="Cover"
                            className={styles.fileInput}
                            type="file"
                            id="coverInput"
                            accept=".png,.jpeg,.jpg"
                            onChange={handlePictureChange}
                        />
                    </>}
            </div>

            <div className={styles.profileUserImgWrapper}>
                <img
                    name="Avatar"
                    className={styles.profileUserImg}
                    src={`${process.env.REACT_APP_BACK_END}${profile}`}
                    alt=""
                    // ref={avatarRef}
                />
                {editable
                    && <>
                        <label htmlFor="avatarInput" className={styles.editIcon}>
                            <CameraAltIcon />
                        </label>
                        <input
                            name="Avatar"
                            className={styles.fileInput}
                            type="file"
                            id="avatarInput"
                            accept=".png,.jpeg,.jpg"
                            onChange={handlePictureChange}
                        />
                    </>}
            </div>
        </div>
    );
}

export default memo(Cover);