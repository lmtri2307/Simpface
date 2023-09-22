import { useCallback, } from "react"
import useListenSocketEvent from "./useListenSocketEvent"
import useMessages from "./useMessages"

const useRealTimeMessages = (convId) => {
    const [messages, setMessages] = useMessages(convId)

    // listen to coming message
    const handleNewMessage = useCallback(
        (newMessage) => {
            console.log("handleNewMessage")
            setMessages(prev => [...prev, newMessage])
        },
        [setMessages]
    )
    useListenSocketEvent("get message", handleNewMessage)

    return messages
}




export default useRealTimeMessages