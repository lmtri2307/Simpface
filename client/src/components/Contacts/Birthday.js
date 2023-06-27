import styles from "./styles.module.scss"

function Birthday() {
    return (
        <div className={styles.birthdayWrapper}>
            <img className={styles.birthdayImg} src={`${process.env.REACT_APP_BACK_END}assets/gift.png`} alt="" />
            <span className={styles.birthdayText}>
                <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
            </span>
        </div>
    );
}

export default Birthday;