import styles from "./styles.module.scss"
import { useRef } from "react"

function ChatBox({onSendMessage}) {
    const messInput = useRef()
    
    const handleSendMess = async () => {
        const message = messInput.current.value

        if(message){
            messInput.current.value = ""
            onSendMessage(message)
        }
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