import { Link } from "react-router-dom";
import styles from "./styles.module.scss"
import { useRef } from "react";
import axiosInstance from "../../api/axios";
function RegisterForm() {
    const usernameInput = useRef()
    const emailInput = useRef()
    const passwordInput = useRef()
    const passwordAgainInput = useRef()
    const handleSubmit = async (e) => {
        // Check retype password
        e.preventDefault()
        if (passwordInput.current.value !== passwordAgainInput.current.value) {
            passwordAgainInput.current.setCustomValidity("Password don't match!")
        } else {
            await axiosInstance.post(`${process.env.REACT_APP_BACK_END}auth/register`,{
                username: usernameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value
            })
            window.location.href="/auth"
        }

    }
    return (
        <form className={styles.registerBox} onSubmit={handleSubmit}>
            <input
                ref={usernameInput}
                placeholder="Username"
                required
            />
            <input
                type="email"
                ref={emailInput}
                required
                placeholder="Email" />
            <input
                type="password"
                ref={passwordInput}
                required
                placeholder="Password" />
            <input
                type="password"
                required
                ref={passwordAgainInput}
                placeholder="Confirm Password" />
            <button type="submit" className={styles.signupButton}>Sign Up</button>
            <Link to="../" className={styles.loginButton}>
                Log into Account
            </Link>
        </form>
    );
}

export default RegisterForm;