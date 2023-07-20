import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_END,
    withCredentials: true
});

export const setUpHandleTokenError = (onTokenError) => {
    axiosInstance.interceptors.response.use(
        (res) => {
            if (res.hasOwnProperty("data")) {
                return res.data;
            }
            return res;
        }, (err) => {
            console.log("axios err:", err)
            if (err.response && err.response.status === 403) {
                onTokenError()
            }
            return Promise.reject(err)
        }
    )
}

export default axiosInstance