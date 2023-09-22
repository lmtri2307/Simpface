import { useNavigate } from "react-router-dom";
import api from "../api";
import useForm from "./useForm";

function useRegisterForm() {
    const { values, onChangeValue, submit } = useForm(
        { username: '', email: '', password: '', passwordAgain: '' },
        api.auth.register
    )

    const navigate = useNavigate()

    const submitRegister = async () => {
        const { password, passwordAgain } = values
        if (password !== passwordAgain) {
            console.log(`password: ${password}, passwordAgain: ${passwordAgain}`)
            throw new Error("passwordagain")
        }

        try {
            const res = await submit()
            alert(res)
            navigate("/auth")
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return { onChangeValue, submit: submitRegister };
}

export default useRegisterForm;