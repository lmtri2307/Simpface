import api from "../api";
import { useAuthContext } from "../context/authContext";
import useForm from "./useForm";

function useLoginForm() {
    const { setUser } = useAuthContext()
    const {onChangeValue, submit} = useForm(
        { email: '', password: '' },
        api.auth.login
    )

    const submitLogin = async () => {
        try {
            const user = await submit()
            setUser(user)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return {onChangeValue, submit: submitLogin};
}

export default useLoginForm;