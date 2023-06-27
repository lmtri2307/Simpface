import styles from "./styles.module.scss"
import ProfileFriend from "./ProfileFriend"
import { memo } from "react";

function UserFriendsList({friends}) {
    return (
        <div className={styles.userFriendsListWrapper}>
            {
                friends.map((item, index) => <ProfileFriend key={index} friendId={item}/>                )
            }
        </div>
    );
}

export default memo(UserFriendsList);