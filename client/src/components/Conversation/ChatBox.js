import styles from "./styles.module.scss"
import { useRef } from "react"
import { useAuthContext } from "../../context/authContext"
import axiosInstance from "../../api/axios"
function ChatBox({convId}) {
    const {user} =useAuthContext()
    const messInput = useRef()
    const handleSendMess = async () => {
        const message = messInput.current.value
        messInput.current.value = ""
        await axiosInstance.post(
            `message`,
            {
                userId: user._id,
                message: message,
                conversationId: convId
            }
        )
    }
    return (
        <div className={styles.chatBoxBottom}>
            <textarea
                className={styles.chatMessageInput}
                placeholder="write something..."
                ref={messInput}
            ></textarea>
            <button
                className={styles.chatSubmitButton}
                onClick={handleSendMess}
            >
                Send
            </button>
        </div>
    );
}

export default ChatBox;