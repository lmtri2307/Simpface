import { useEffect, useState } from "react"
import api from "../api"

// transform the messages
const transformMessages = async (messagesFromServer) => {
    const transformedMessages = Promise.all(
        messagesFromServer.map(
            async (mess) => {
                return {
                    message: mess,
                    sender: await api.user.getUser(mess.sender)
                }
            }
        )
    )

    return transformedMessages
}

// Fetch all messages of a conversation
const useMessages = (convId) => {
    const [messages, setMessages] = useState([])
    useEffect(
        () => {
            let isIgnored = false
            const callApi = async () => {
                const messagesFromServer = await api.message.getMessagesOfConv(convId)
                const transformedMessages = await transformMessages(messagesFromServer)
                console.log("transformedMessages: ",transformedMessages)
                if (!isIgnored) setMessages(transformedMessages);
            }
            callApi()
            return () => {
                isIgnored = true
            }
        },
        [convId]
    )
    return [messages, setMessages];
}

export default useMessages