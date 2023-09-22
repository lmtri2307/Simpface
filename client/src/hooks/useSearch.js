import { useState } from "react";

function useSearch(useSearchData) {
    const [input, setInput] = useState('')
    const results = useSearchData(input)

    const search = (input) => {
        setInput(input)
    }
    return {results, search};
}

export default useSearch;