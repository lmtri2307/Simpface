import { memo, useState } from "react";
import styles from "./styles.module.scss"
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import clsx from "clsx";
import useInfoLogic from "../../hooks/useInfoLogic";

function Info({ username }) {
    console.log("Info get username: ", username)
    const { isCurrentUser, userInfo, onSubmit } = useInfoLogic(username)

    const [isEditting, setIsEditting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(e.target)
            .then(() => setIsEditting(false))
    }

    return (
        <div className={clsx(styles.infoWrapper, {
            [styles.editing]: isEditting
        })}>
            <form id="infoForm" className={styles.rightbarInfo}
                onSubmit={handleSubmit}
            >
                {
                    userInfo &&
                    Object.entries(userInfo).map(([info, value], index) => {
                        if (isEditting)
                            return <div key={index} className={styles.rightbarInfoItem}>
                                <span className={styles.rightbarInfoKey}>
                                    {info.charAt(0).toUpperCase() + info.slice(1).toLowerCase()}:
                                </span>
                                <input
                                    className={styles.rightbarInfoValue}
                                    defaultValue={value}
                                    name={info}
                                />
                            </div>
                        else
                            return <div key={index} className={styles.rightbarInfoItem}>
                                <span className={styles.rightbarInfoKey}>
                                    {info.charAt(0).toUpperCase() + info.slice(1).toLowerCase()}:
                                </span>
                                <span className={styles.rightbarInfoValue}>
                                    {value}
                                </span>
                            </div>

                    })
                }
            </form>
            {
                isCurrentUser
                && (isEditting
                    ? <div className={styles.editingBtnWrapper}>
                        <button
                            className={styles.followBtn}
                            onClick={() => { setIsEditting(false) }}
                        >
                            Cancel<CancelIcon />
                        </button>
                        <button
                            className={styles.followBtn}
                            type="submit"
                            form="infoForm"
                        >
                            Update <CheckIcon />
                        </button>
                    </div>
                    : <button
                        className={styles.followBtn}
                        onClick={() => { setIsEditting(true) }}
                    >
                        <EditIcon /> Update Profile
                    </button>)

            }  </div>
    );
}

export default memo(Info);