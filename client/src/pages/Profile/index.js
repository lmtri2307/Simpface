import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Feed from "../../components/Feed";
import styles from "./styles.module.scss"
import ProfileInfo from "../../components/ProfileInfo";
import Cover from "../../components/Cover";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axiosInstance from "../../api/axios";

function Profile() {
    const { user } = useAuthContext()
    const { userName } = useParams()
    // alert(userName)
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${userName}`)
            .then(res => {
                console.log("current user:",res.data)
                setCurrentUser(res.data)
            })
    }, [userName, user])


    if(!currentUser)
        return <></>
    return (
        <div >
            <TopBar></TopBar>
            <div className={styles.wrapper}>
                <div className={styles.sideBar}>
                    <Sidebar></Sidebar>
                </div>
                <div className={styles.content}>
                    <div className={styles.profileCover}>
                        <Cover
                            profile={currentUser.profilePicture}
                            cover={currentUser.coverPicture}
                            editable={user && currentUser.username === user.username}
                        />
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.feed}>
                            <Feed username={currentUser.username}></Feed>
                        </div>

                        <div className={styles.rightBar}>
                            <ProfileInfo username={currentUser.username}></ProfileInfo>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Profile;