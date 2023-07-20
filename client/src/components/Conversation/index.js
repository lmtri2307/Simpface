import { memo, useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss"
import Message from "./Message";
import socket from "../../socket/socket";
import ChatBox from "./ChatBox";
import api from "../../api"
function Conversation({ convId }) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState(null)

    // get messages and its sender full info
    useEffect(() => {
        setMessages(null)
        api.message.getMessagesOfConv(convId)
            .then(res => {
                Promise.all(res.map((mess, index) =>
                    api.user.getUser(mess.sender)
                )).then(promises => setMessages(promises.map((promise, index) => {
                    return {
                        message: res[index],
                        sender: promise
                    }
                })))

            })
    }, [convId])

    // listen for up comming message
    useEffect(() => {
        socket.on("get message", (newMessage) => {
            console.log("get message")
            setMessages(prev => [...prev, newMessage])
        })

        return () => {
            console.log("off get message")
            socket.off("get message")
        }
    }, [])

    // scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    return (
        <>
            <div className={styles.chatBoxTop}>
                {messages
                    ? messages.map((mess) => (
                        <div key={mess.message._id} ref={scrollRef}>
                            <Message message={mess.message} sender={mess.sender} />
                        </div>
                    ))
                    : <span className={styles.noConversationText}>
                        Loading ...
                    </span>
                }

            </div>
            <ChatBox convId={convId} setMessages={setMessages} />
        </>
    );
}

export default memo(Conversation);