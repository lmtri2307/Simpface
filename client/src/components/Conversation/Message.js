import { memo } from 'react';
import { useAuthContext } from '../../context/authContext';
import styles from './styles.module.scss';
import { format } from "timeago.js";


// export default function Message({ message, own }) {
function Message({ message, sender }) {
  console.log("message render")
  const { user } = useAuthContext()

  const own = user._id === message.sender

  return (
    <div className={own
      ? `${styles.message} ${styles.own} `
      : styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={`${process.env.REACT_APP_BACK_END}${sender.profilePicture}`}
          alt=""
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}

export default memo(Message)