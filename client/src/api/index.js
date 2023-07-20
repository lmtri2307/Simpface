import MessageApi from "./collections/message"
import UserApi from "./collections/user"
import PostApi from "./collections/post"
import AuthApi from "./collections/auth"

class API {
    message = new MessageApi()
    user = new UserApi()
    post = new PostApi()
    auth = new AuthApi()
}

const api = new API()
export default api