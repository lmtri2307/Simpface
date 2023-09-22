import styles from "./styles.module.scss"
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/TopBar";
import { useAuthContext } from "../../context/authContext";
import OnlineUser from "../../components/OnlineUser";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Conversation from "../../components/Conversation";
import socket from "../../socket/socket";
import api from "../../api";
import useSearchUserResults from "../../hooks/useSearchUserResults";
import UserSearchResult from "../../components/SearchBar/UserSearchResult";

const MemoConversation = memo(Conversation)

function Messenger() {
    const { user } = useAuthContext()
    const [conversations, setConversations] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [openedConv, setOpenedConv] = useState(null)
    const onSearchResultClick = useCallback(async (userResult) => {
        if (userResult._id === user._id) {
            alert("Can not create conversation with yourself")
        }
        let conv = conversations.find(conv => conv.members.includes(userResult._id))
        if (!conv) {
            conv = await api.message.createConversation(user._id, userResult._id)
            setConversations(prev => [...prev, conv])
        }
        setOpenedConv(conv)
    }, [user, conversations])

    //
    useEffect(() => {
        user && api.message.getAllConvs(user._id)
            .then(result => setConversations(result))
        socket.emit("get online users")
        socket.on("get online users", (onlineUsers) => {
            console.log("online user list", onlineUsers)
            setOnlineUsers(onlineUsers)
        })
        return () => {
            socket.off("get online users")
        }
    }, [user])
    const handleChooseConv = useRef((conv) => {
        socket.emit("open conversation", conv._id)
        console.log("emit: open conversation")
        setOpenedConv(conv)
    })
    useEffect(() => {
        console.log("openedConv useEffect run")
        openedConv && socket.emit("open conversation", openedConv._id)
        return () => {
            openedConv && socket.emit("close conversation", openedConv._id)
        }
    }, [openedConv])

    return (
        <>
            <TopBar />
            <div className={styles.messenger}>
                <div className={styles.chatMenu}>
                    <div className={styles.chatMenuWrapper}>
                        {/* <input placeholder="Search for friends" className={styles.chatMenuInput} /> */}
                        <div className={styles.chatMenuInput}>
                            <SearchBar
                                onResultClick={onSearchResultClick}
                                useSearchData={useSearchUserResults}
                                ResultComponent={UserSearchResult}
                            />
                        </div>
                        {
                            conversations.map((conv, index) => {
                                const userId = conv.members.find(userId => userId !== user._id)
                                return (
                                    <div key={index}
                                        className={styles.chatMenuUser}
                                        onClick={() => { handleChooseConv.current(conv) }}>
                                        <OnlineUser isOnline={onlineUsers.includes(userId)} userId={userId} />
                                    </div>)
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.chatBox}>
                    <div className={styles.chatBoxWrapper}>
                        {openedConv
                            ? <MemoConversation convId={openedConv._id} />
                            : (
                                <span className={styles.noConversationText}>
                                    Open a conversation to start a chat.
                                </span>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;