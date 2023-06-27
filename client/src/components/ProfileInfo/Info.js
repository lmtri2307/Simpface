import { memo, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { useAuthContext } from "../../context/authContext";
import clsx from "clsx";
import axiosInstance from "../../api/axios";

function Info({ username }) {
    const { user } = useAuthContext()
    const [userInfo, setUserInfo] = useState({})
    const [isEditting, setIsEditting] = useState(false)
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${username}/info`)
            .then(res => setUserInfo(res.data))
    }, [username])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const info = {};
        for (let [key, value] of formData.entries()) {
            info[key] = value;
        }
        axiosInstance.put(`${process.env.REACT_APP_BACK_END}userinfo/${username}`, { info })
            .then(res => {
                setUserInfo(res.data)
                setIsEditting(false)
            })
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
                (user && user.username === username)
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