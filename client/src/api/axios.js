import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_END,
    withCredentials: true
});

export const setUpHandleTokenError = (onError) => {
    axiosInstance.interceptors.response.use(
        (res) => {
            return res
        }, (err) => {
            if(err.response && err.response.status === 403){
                onError()
            }
            return Promise.reject(err)
        }
    )
}


export default axiosInstance