import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import styles from "./styles.module.scss"

function Login() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.introduction}>
                    <h3 className={styles.logo}>SimpFace</h3>
                    <span className={styles.desc}>
                        Connect with friends and the world around you on SimpFace.
                    </span>
                </div>
                <div className={styles.form}>
                    <Routes>
                        <Route path="/" exact element={<LoginForm />} />
                        <Route path="register" exact element={<RegisterForm />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}

export default Login;