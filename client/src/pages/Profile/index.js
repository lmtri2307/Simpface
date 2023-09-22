import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Feed from "../../components/Feed";
import styles from "./styles.module.scss"
import ProfileInfo from "../../components/ProfileInfo";
import Cover from "../../components/Cover";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import api from "../../api";

function Profile() {
    const { user } = useAuthContext()
    const { userName } = useParams()
    // alert(userName)
    const [currentUser, setCurrentUser] = useState(null)
    const isSelf = user && userName === user.username
    useEffect(() => {
        if(isSelf)  {
            setCurrentUser(user)
            return
        }
        api.user.getUser(userName)
            .then(user => {
                console.log("current user:", user)
                setCurrentUser(user)
            })
    }, [userName, isSelf, user])
    
    return (
        <div >
            <TopBar></TopBar>
            <div className={styles.wrapper}>
                <div className={styles.sideBar}>
                    <Sidebar></Sidebar>
                </div>
                <div className={styles.content}>
                    <div className={styles.profileCover}>
                        {
                            currentUser &&
                            <Cover
                                profile={currentUser.profilePicture}
                                cover={currentUser.coverPicture}
                                editable={user && currentUser.username === user.username}
                            />
                        }

                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.feed}>
                            {currentUser && <Feed username={currentUser.username}></Feed>}
                        </div>

                        <div className={styles.rightBar}>
                            {currentUser && <ProfileInfo username={currentUser.username}></ProfileInfo>}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Profile;