import styles from "./styles.module.scss"
import Tippy from "@tippyjs/react/headless";

function SearchResult({ children, results, isShowned, onResultClick, ResultComponent }) {

    return (
        <Tippy
            placement="bottom"
            visible={isShowned}

            interactive
            render={attrs => (
                <div>
                    <div className={styles.dropDownWrapper} tabIndex="-1" {...attrs}>
                        {results.map((result, index) =>
                            <ResultComponent
                                key={index}

                                {...result}
                                onClick={() => { onResultClick(result) }}
                            >
                            </ResultComponent>
                        )}
                    </div>
                </div>
            )}
        >
            {children}
        </Tippy >
    );
}

export default SearchResult;