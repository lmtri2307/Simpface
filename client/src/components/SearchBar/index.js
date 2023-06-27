import { memo, useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import styles from "./styles.module.scss"

import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import axiosInstance from "../../api/axios";
function SearchBar({ onResultClick }) {
    const [results, setResults] = useState([])
    const [isShowned, setIsShowned] = useState(false)
    const parentRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (parentRef.current && !parentRef.current.contains(event.target)) {
                setIsShowned(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleSearch = async (e) => {
        if (e.target.value) {
            const users = (await axiosInstance.get(`${process.env.REACT_APP_BACK_END}users/${e.target.value}/find`)).data
            setResults(users)
            setIsShowned(true)
        } else {
            setIsShowned(false)
        }
    }

    return (
        <div className={styles.wrapper}
            ref={parentRef}
        >
            <SearchResult results={results}
                isShowned={isShowned}
                setIsShowned={setIsShowned}
                onResultClick={onResultClick}
            >
                <div className={styles.searchbar}>
                    <SearchIcon className={styles.searchIcon} />
                    <input
                        placeholder="Search for friend, post or video"
                        className={styles.searchInput}
                        onChange={handleSearch}
                        onFocus={(e) => { e.target.value && setIsShowned(true) }}
                    />

                </div>
            </SearchResult>
        </div>

    );
}

export default memo(SearchBar);