import styles from "./styles.module.scss"

function Result({ imgSrc, accountName, onClick }) {
    return (
        <div to={`/profile/${accountName}`} className={styles.result} onClick={onClick}>
            <img src={`${process.env.REACT_APP_BACK_END}${imgSrc}`} alt="" />
            <div className={styles.info}>
                <span className={styles.accountName}> {accountName} </span>
            </div>
        </div>
    );
}

export default Result;