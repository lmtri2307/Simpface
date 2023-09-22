import ChatBox from "./ChatBox";
import useRealTimeMessages from "../../hooks/useMessages";
import api from "../../api";
import { useAuthContext } from "../../context/authContext";
import MessageWindow from "./MessageWindow";
function Conversation({ convId }) {
    const { user } = useAuthContext()
    const messages = useRealTimeMessages(convId)

    const onSendMessage = async (message) => {
        await api.message.postMessage(user._id, message, convId)
    }

    return (
        <>
            <MessageWindow messages={messages} />
            <ChatBox convId={convId} onSendMessage={onSendMessage} />
        </>
    );
}



export default Conversation;