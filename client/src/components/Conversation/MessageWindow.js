import { useEffect, useRef } from "react";
import styles from "./styles.module.scss"
import Message from "./Message";

function MessageWindow({ messages }) {
    // Scroll to the latest message
    const scrollRef = useRef();
    useEffect(
        () => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }) }
    )

    return <>
        <div className={styles.chatBoxTop}>
            {messages
                ? messages.map((mess, index) => (
                    <div
                        key={mess.message._id}
                        ref={index === messages.length - 1 ? scrollRef : null}
                    >
                        <Message message={mess.message} sender={mess.sender} />
                    </div>
                ))
                : <span className={styles.noConversationText}>
                    Loading ...
                </span>
            }
        </div>
    </>
}

export default MessageWindow;