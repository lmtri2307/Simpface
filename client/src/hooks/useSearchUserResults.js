import { useEffect, useState } from "react"
import api from "../api"

const useSearchUserResults = (searchInput) => {
    const [results, setResults] = useState([])
    useEffect(
        () => {
            let isIgnored = false
            const search = async () => {
                if(searchInput){
                    const res = await api.user.searchUsers(searchInput)
                    if(!isIgnored) setResults(res);
                }
            }
            search()
            return () => {
                isIgnored = true
            }
        },
        [searchInput]
    )

    return results;
}

export default useSearchUserResults