import styles from "./styles.module.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
function Nav() {
    const { user , logout} = useAuthContext()
    return (<div className={styles.wrapper}>
        <div>
            <span className={styles.link}>Homepage</span>
            <span className={styles.link}>Timeline</span>
        </div>
        <div className={styles.icons}>
            <div className={styles.icon}>
                <PersonIcon />
                <span className={styles.notiCount}>1</span>
            </div>
            <Link to='/messenger' className={styles.icon}>
                <ChatIcon />
                <span className={styles.notiCount}>2</span>
            </Link>
            <div className={styles.icon}>
                <NotificationsIcon />
                <span className={styles.notiCount}>1</span>
            </div>
        </div>
        {
            user
            &&
            <div style={{display: "flex", alignItems: "center"}}>
                <Link to={`/profile/${user.username}`}  >
                    {user.profilePicture
                        ? <img alt="" src={`${process.env.REACT_APP_BACK_END}${user.profilePicture}`} className={styles.accountImg} />
                        : <AccountCircleIcon className={styles.accountImg} />}
                </Link>
                <LogoutIcon 
                className={styles.logOutIcon} 
                onClick={logout}/>
            </div>
        }

    </div>);
}

export default Nav;