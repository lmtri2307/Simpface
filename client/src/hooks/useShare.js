import { useRef, useState } from "react"
import api from "../api"

function useShare() {
    const statusRef = useRef('')
    const [file, setFile] = useState()

    function reset() {
        statusRef.current.value = ''
        setFile(null)
    }

    const sharePost = async () => {
        try {
            const status = statusRef.current.value

            if (!file && !status) {
                alert("Nothing to post")
                return
            }

            const newPost = await api.post.createPost(file, status)

            reset()

            return newPost
        } catch (error) {
            alert("Upload fail")
        }
    }

    return {statusRef, file, setFile, sharePost};
}

export default useShare;