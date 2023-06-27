import { memo, useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss"
import Message from "./Message";
import socket from "../../socket/socket";
import ChatBox from "./ChatBox";
import axiosInstance from "../../api/axios";

function Conversation({ convId }) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState(null)

    // get messages and its sender full info
    useEffect(() => {
        setMessages(null)
        axiosInstance.get(`message/${convId}`)
            .then(res => {
                Promise.all(res.data.map((mess, index) =>
                    axiosInstance.get(`users/${mess.sender}`)
                )).then(promises => setMessages(promises.map((promise, index) => {
                    return {
                        message: res.data[index],
                        sender: promise.data
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