import { Link } from "react-router-dom";
import styles from "./styles.module.scss"
import useLoginForm from "../../hooks/useLoginForm";
function LoginForm() {
    const {onChangeValue, submit} = useLoginForm()

    return (
        <form onSubmit={(e) => {e.preventDefault(); submit();}} className={styles.loginBox}>
            <input name="email" type="email" placeholder="Email" 
                onChange={onChangeValue}
            />
            <input name="password" type="password" placeholder="Password" 
                onChange={onChangeValue}
            />
            <button type="submit" className={styles.loginButton}>Log In</button>
            <span className={styles.loginForgot}>Forgot Password?</span>
            <Link to="register" className={styles.registerButton}>
                Create a New Account
            </Link>
        </form>
    );
}

export default LoginForm;