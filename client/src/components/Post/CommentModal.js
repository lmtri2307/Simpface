import { useEffect } from "react"
import styles from "./styles.module.scss"

function CommentModal({ children }) {
    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])
    return (
        <div className={styles.modal}>
            {children}
        </div>

    )
}
export default CommentModal