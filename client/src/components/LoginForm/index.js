import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

import styles from "./styles.module.scss"
import { useRef } from "react";
function LoginForm() {
    const emailInput = useRef()
    const passwordInput = useRef()
    const { login } = useAuthContext();
    const handleSumit = async (e) => {
        e.preventDefault()
        try {
            await login(emailInput.current.value, passwordInput.current.value)
        } catch (error) {
            alert(error.response.data)
        }
    }
    return (
        <form onSubmit={handleSumit} className={styles.loginBox}>
            <input ref={emailInput} type="email" placeholder="Email" />
            <input ref={passwordInput} type="password" placeholder="Password" />
            <button type="submit" className={styles.loginButton}>Log In</button>
            <span className={styles.loginForgot}>Forgot Password?</span>
            <Link to="register" className={styles.registerButton}>
                Create a New Account
            </Link>
        </form>
    );
}

export default LoginForm;