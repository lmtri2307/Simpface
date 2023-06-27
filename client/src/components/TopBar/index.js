import { memo, useCallback } from "react";
import Nav from "../Nav";
import SearchBar from "../SearchBar";
import styles from "./styles.module.scss"
import { Link, useNavigate } from "react-router-dom";
function TopBar() {
    console.log("Topbar re-render")
    const navigate = useNavigate()
    const handleSearchResultClick = useCallback((user) => {
        navigate(`/profile/${user.username}`)
    },[navigate])
    return (<div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
           SimpFace
        </Link>

        <div className={styles.search}>
            <SearchBar onResultClick={handleSearchResultClick}></SearchBar>
        </div>
        <div className={styles.nav}>
            <Nav></Nav>
        </div>
    </div>);
}

export default memo(TopBar);