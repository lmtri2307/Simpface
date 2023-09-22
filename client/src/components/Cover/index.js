import styles from "./styles.module.scss"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useCover from "../../hooks/useCover";

function Cover({ profile, cover, editable }) {
    const { handlePictureChange } = useCover()
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

export default Cover;