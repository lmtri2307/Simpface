import { useCallback } from "react";
import Result from "./Result";
import styles from "./styles.module.scss"
import Tippy from "@tippyjs/react/headless";

function SearchResult({ children, results, isShowned, setIsShowned, onResultClick }) {
    console.log("SearchResult re-render")

    const handleResultClick = useCallback((user) => {
        onResultClick(user)

        setIsShowned(false)
    }, [onResultClick, setIsShowned])

    return (
        <Tippy
            placement="bottom"
            visible={isShowned}

            interactive
            render={attrs => (
                <div className={styles.dropDownWrapper} tabIndex="-1" {...attrs}>
                    {results.map((item, index) =>
                        <Result
                            key={index}
                            imgSrc={item.profilePicture}
                            accountName={item.username}
                            onClick={() => { handleResultClick(item) }}
                        >
                        </Result>
                    )}
                </div>
            )}
        >
            {children}
        </Tippy >
    );
}

export default SearchResult;