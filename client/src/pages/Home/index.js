
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styles from "./styles.module.scss";
import Feed from "../../components/Feed";
import Contacts from "../../components/Contacts";
function Home() {
    return (
        <div>
            <TopBar></TopBar>
            <div className={styles.content}>
                <div className={styles.sideBar}>
                    <Sidebar></Sidebar>
                </div>
                <div className={styles.feed}>
                    <Feed></Feed>
                </div>
                <div className={styles.rightBar}>
                    <Contacts></Contacts>
                </div>
            </div>
        </div>);
}

export default Home;