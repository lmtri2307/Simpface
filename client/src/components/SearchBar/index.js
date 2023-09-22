import { memo, useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import styles from "./styles.module.scss"
import SearchIcon from '@mui/icons-material/Search';
import useSearch from "../../hooks/useSearch";

function SearchBar({ useSearchData, ResultComponent, onResultClick }) {
    const {results, search: onSearch} = useSearch(useSearchData)

    const [showResults, setShowResults] = useState(false)
    
    // Hide results when click outside
    const parentRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (parentRef.current && !parentRef.current.contains(event.target)) {
                setShowResults(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Search input change
    const handleSearch = (e) => {
        if (e.target.value) {   // hide the results when searchInput is blank
            onSearch(e.target.value)
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }

    return (
        <div className={styles.wrapper}
            ref={parentRef}
        >
            <SearchResult
                results={results}
                isShowned={showResults}
                setIsShowned={setShowResults}
                ResultComponent = {ResultComponent}
                onResultClick={(result) => {
                    onResultClick(result)
                    setShowResults(false)
                }}
            >
                <div className={styles.searchbar}>
                    <SearchIcon className={styles.searchIcon} />
                    <input
                        placeholder="Search for friend, post or video"
                        className={styles.searchInput}
                        onChange={handleSearch}
                        onFocus={(e) => { e.target.value && setShowResults(true) }}
                    />

                </div>
            </SearchResult>
        </div>
    )
}

export default memo(SearchBar);