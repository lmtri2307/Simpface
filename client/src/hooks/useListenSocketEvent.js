import { useEffect } from "react"
import socket from "../socket/socket"

const useListenSocketEvent = (eventName, handleEvent) => {
    useEffect(
        () => {
            socket.on(eventName, handleEvent)
            console.log("listen message")
            return () => {
                console.log("stop listen message")

                socket.off(eventName)
            }
        }, [eventName, handleEvent]
    )
}

export default useListenSocketEvent