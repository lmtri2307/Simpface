import { Link } from "react-router-dom";
import styles from "./styles.module.scss"
import { useRef } from "react";
import useRegisterForm from "../../hooks/useRegisterForm";
function RegisterForm() {
    const { onChangeValue, submit } = useRegisterForm()


    const passwordAgainInput = useRef()
    const formRef = useRef()


    const clearCustomValidity = () => {
        passwordAgainInput.current.setCustomValidity('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await submit()
        } catch (error) {
            if (error.message === "passwordagain") {
                passwordAgainInput.current.setCustomValidity("Password don't match!")
                console.log("CustomValidity is set")
                formRef.current.reportValidity()
            }
        }
    }


    return (
        <form className={styles.registerBox} onSubmit={handleSubmit} ref={formRef}>
            <input
                name="username"
                onChange={onChangeValue}
                placeholder="Username"
                required
            />
            <input
                type="email"
                name="email"
                onChange={onChangeValue}
                required
                placeholder="Email" />
            <input
                type="password"
                name="password"
                onChange={onChangeValue}
                onInput={clearCustomValidity}
                required
                placeholder="Password" />
            <input
                type="password"
                name="passwordAgain"
                ref={passwordAgainInput}
                onChange={onChangeValue}
                onInput={clearCustomValidity}
                required
                placeholder="Confirm Password" />
            <button type="submit" className={styles.signupButton}>Sign Up</button>
            <Link to="../" className={styles.loginButton}>
                Log into Account
            </Link>
        </form>
    );
}

export default RegisterForm;