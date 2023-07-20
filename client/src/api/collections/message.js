import axiosInstance from "../axios"

const url = "message"

class MessageApi {
    getMessagesOfConv = (convId) => {
        return axiosInstance.get(`${url}/${convId}`)
    }
    postMessage = (userId, message, convId) => {
        return axiosInstance.post(
            url,
            {
                userId: userId,
                message: message,
                conversationId: convId
            }
        )
    }
    createConversation = (senderId, receiverId) => {
        return axiosInstance.post(`conversation`, { senderId, receiverId })
    }
    getAllConvs = (userId) => {
        return axiosInstance.get(`conversation/${userId}`)
    }
}

export default MessageApi