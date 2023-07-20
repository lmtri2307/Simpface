import { useEffect } from "react"
import styles from "./styles.module.scss"

function CommentModal({ children, hideModal }) {
    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])
    return (
        <div className={styles.modal} onClick={hideModal}>
            {children}
        </div>
    )
}
export default CommentModal