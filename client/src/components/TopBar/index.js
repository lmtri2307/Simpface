import useSearchUserResults from "../../hooks/useSearchUserResults";
import Nav from "../Nav";
import SearchBar from "../SearchBar";
import UserSearchResult from "../SearchBar/UserSearchResult";
import styles from "./styles.module.scss"
import { Link, useNavigate } from "react-router-dom";
function TopBar() {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <Link to="/" className={styles.logo}>
                SimpFace
            </Link>

            <div className={styles.search}>
                <SearchBar
                    useSearchData={useSearchUserResults}
                    ResultComponent={UserSearchResult}
                    onResultClick={(user) => {
                        navigate(`/profile/${user.username}`)
                    }}
                />
            </div>
            <div className={styles.nav}>
                <Nav></Nav>
            </div>
        </div>);
}

export default TopBar;