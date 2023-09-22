import { useEffect, useState } from "react"
import socket from "../socket/socket"

function useOnlineUsers() {
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
        socket.emit("get online users")
        socket.on("get online users", setOnlineUsers)
        return () => {
            socket.off("get online users")
        }
    }, [])
    return onlineUsers;
}

export default useOnlineUsers;