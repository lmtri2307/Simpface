import axiosInstance from "../axios"

const url = "users"

class UserApi {
    getUser = (usernameOrId) => {
        return axiosInstance.get(`${url}/${usernameOrId}`)
    }
    changePicture = (userId, nameOfImg, pictureFile) => {
        const data = new FormData()
        data.append("picture", pictureFile)
        return axiosInstance.put(`${url}/${userId}/change${nameOfImg}`, data)
    }
    getFriendInfo = (friendId) => {
        return axiosInstance.get(`${url}/${friendId}/asfriend`)
    }
    checkFollowedUser = (username) => {
        return axiosInstance.get(`${url}/${username}/isFollowed`)
    }
    getFollowingsOfUser = (username) => {
        return axiosInstance.get(`${url}/${username}/followings`)
    }
    unfollowUser = (username) => {
        return axiosInstance.put(`${url}/${username}/unfollow`)
    }
    followUser = (username) => {
        return axiosInstance.put(`${url}/${username}/follow`)
    }
    getUserInfo = (username) => {
        return axiosInstance.get(`${url}/${username}/info`)
    }
    updateInfo = (username, form) => {
        const formData = new FormData(form);
        const info = {};
        for (let [key, value] of formData.entries()) {
            info[key] = value;
        }
        return axiosInstance.put(`userinfo/${username}`, { info })
    }
    searchUsers = (username) => {
        return axiosInstance.get(`${url}/${username}/find`)
    }
}

export default UserApi