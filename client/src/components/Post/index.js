import styles from "./styles.module.scss"
import { MoreVert } from '@mui/icons-material';
import { memo, useRef, useState } from "react";
import { format } from "timeago.js"
import { useAuthContext } from "../../context/authContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SelfComment from "./SelfComment";
import CloseIcon from '@mui/icons-material/Close';
import Comment from "./Comment";
import CommentModal from "./CommentModal";
import api from "../../api";
import usePost from "../../hooks/usePost";

const MemoSelfComment = memo(SelfComment)

function Post({ post }) {
    const {postData, addComment} = usePost(post)

    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)


    const numOfLikes = useRef(postData.likes.length)
    const [isLiked, setIsLiked] = useState(user && postData.likes.includes(user._id))
    const handleLikeClick = () => {
        const currentLikes = numOfLikes.current

        if (!user) {
            navigate("/auth")
            return
        }

        numOfLikes.current = isLiked
            ? currentLikes - 1
            : currentLikes + 1
        setIsLiked(prev => !prev)

        api.post.likePost(postData._id)
            .catch(() => {
                numOfLikes.current = currentLikes
                setIsLiked(isLiked)
            })
    }
    const hideModal = () => { setShowModal(false) }

    const PostElement =
        <div className={styles.wrapper} onClick={(e) => { e.stopPropagation() }}>
            {/* Header of Modal */}
            {showModal &&
                <div className={styles.modalHeader}>
                    <span>Bài viết của {postData.user.username}</span>
                    <div className={styles.closeButton}
                        onClick={hideModal}
                    >
                        <CloseIcon />
                    </div>
                </div>
            }
            {/* Post */}
            <div className={styles.post}>
                <div className={styles.postHeader}>
                    <div className={styles.info}>
                        <Link className={styles.accLink} to={`/profile/${postData.user.username}`}>
                            <img
                                className={styles.accImg}
                                src={process.env.REACT_APP_BACK_END + postData.user.profilePicture}
                                alt=""
                            />
                        </Link>
                        <span className={styles.userName}>
                            {postData.user.username}
                        </span>
                        <span className={styles.date}>
                            {format(postData.createdAt)}
                        </span>
                    </div>
                    <div className={styles.moreBtn}>
                        <MoreVert />
                    </div>
                </div>
                <div className={styles.postContent}>
                    {postData.hasOwnProperty('desc') ?
                        <span className={styles.status}>
                            {postData.desc}
                        </span>
                        : null}
                    {postData.hasOwnProperty('photo')
                        ? <img
                            className={styles.img}
                            src={process.env.REACT_APP_BACK_END + postData.photo}
                            alt="" />
                        : null}
                </div>
                <div className={styles.interact}>
                    <div className={styles.reaction}>
                        <img className={clsx(styles.icon, {
                            [styles.isNotLiked]: !isLiked
                        })}
                            onClick={handleLikeClick}
                            src={process.env.REACT_APP_BACK_END + "assets/like.png"}
                            alt="" />
                        <img className={clsx(styles.icon, {
                            [styles.isNotLiked]: !isLiked
                        })}
                            onClick={handleLikeClick}
                            src={process.env.REACT_APP_BACK_END + "assets/heart.png"}
                            alt="" />
                        <span className={styles.reactCount}>{numOfLikes.current} people like it</span>
                    </div>
                    <div className={styles.comment} onClick={() => {
                        setShowModal(true)
                    }}>
                        <span className={styles.commentText}>{postData.comments.length} comments</span>
                    </div>
                </div>
                {/* Comments Window when showing Modal */}
                {showModal &&
                    <>
                        <hr className={styles.hr} />
                        <div className={styles.comments}>
                            {
                                postData.comments.map((comment) =>
                                    <Comment
                                        key={comment._id}
                                        comment={comment}
                                    />)
                            }
                        </div>
                    </>
                }
            </div>
            {/* Sef comment */}
            {showModal &&
                <MemoSelfComment handleComment={addComment} />
            }
        </div>

    return showModal ? <CommentModal onClick={() => setShowModal(false)} children={PostElement} /> : PostElement
}

export default Post