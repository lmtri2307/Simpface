import axiosInstance from "../axios"

const url = "auth"

class AuthApi {
    register = (username, email, password) => {
        return axiosInstance.post(`${url}/register`, { username, email, password })
    }
    getUserContext = () => {
        return axiosInstance.get(`${url}`)
    }
    login = (email, password) => {
        return axiosInstance.post(`${url}/login`,
            {
                email,
                password
            }
        )
    }
    logout = () => {
        return axiosInstance.get(`${url}/logout`)
    }
}

export default AuthApi