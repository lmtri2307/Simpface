import axiosInstance from "../axios"

const url = "post"

class PostApi {
    getPostOfUser = (username) => {
        return axiosInstance.get(`${url}/${username}`)
    }
    getTimelinePost = () => {
        return axiosInstance.get(`${url}/timeline/all`)
    }
    likePost = (postId) => {
        return axiosInstance.put(`${url}/${postId}/like`)
    }
    commentPost = (postId, comment) => {
        return axiosInstance.put(`${url}/${postId}/comment`, { comment })
    }
    createPost = async (imageFile, status) => {
        let imgPath
        if (imageFile)
        {
            const data = new FormData()
            data.append("avatar", imageFile)
            imgPath = (await axiosInstance.post(`${url}/upload`, data)).filePath
        }
        return axiosInstance.post(`${url}/create`, {
            desc: status,
            photo: imgPath
        })
    }
}

export default PostApi