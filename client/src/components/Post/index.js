import styles from "./styles.module.scss"
import { MoreVert } from '@mui/icons-material';
import { Fragment, memo, useCallback, useState } from "react";
import { format } from "timeago.js"
import { useAuthContext } from "../../context/authContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MyComment from "./MyComment";
import CloseIcon from '@mui/icons-material/Close';
import AComment from "./AComment";
import CommentModal from "./CommentModal";
import axiosInstance from "../../api/axios";

function Post({ post }) {
    const { user } = useAuthContext()
    const [comments, setComments] = useState(post.comments)
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(user && post.likes.includes(user._id))

    const navigate = useNavigate()
    const handleLikeClick = () => {
        if (!user) {
            navigate("/auth")
            return
        }
        setLikes(prev => { return isLiked ? prev - 1 : prev + 1 })
        setIsLiked(prev => !prev)

        axiosInstance.put(`${process.env.REACT_APP_BACK_END}post/${post._id}/like`).catch(() => {
            setLikes(likes)
            setIsLiked(isLiked)
        })
    }

    const [showModal, setShowModal] = useState(false)
    const Comp = showModal ? CommentModal : Fragment


    const handleComment = useCallback(async (newComment) => {
        axiosInstance.put(`${process.env.REACT_APP_BACK_END}post/${post._id}/comment`, {
            comment: newComment
        }).then(res => {
            setComments(prev => [...prev, res.data])
        })

    }, [post._id])


    return (
        <Comp >
            <div className={styles.wrapper}>
                {showModal &&
                    <div className={styles.modalHeader}>
                        <span>Bài viết của {post.user.username}</span>
                        <div className={styles.closeButton} onClick={() => {
                            setShowModal(false)
                        }}>
                            <CloseIcon />
                        </div>
                    </div>
                }
                <div className={styles.post}>
                    <div className={styles.postHeader}>
                        <div className={styles.info}>
                            <Link className={styles.accLink} to={`/profile/${post.user.username}`}>
                                <img
                                    className={styles.accImg}
                                    src={process.env.REACT_APP_BACK_END + post.user.profilePicture}
                                    alt=""
                                />
                            </Link>
                            <span className={styles.userName}>
                                {post.user.username}
                            </span>
                            <span className={styles.date}>
                                {format(post.createdAt)}
                            </span>
                        </div>
                        <div className={styles.moreBtn}>
                            <MoreVert />
                        </div>
                    </div>
                    <div className={styles.postContent}>
                        {post.hasOwnProperty('desc') ?
                            <span className={styles.status}>
                                {post.desc}
                            </span>
                            : null}
                        {post.hasOwnProperty('photo')
                            ? <img
                                className={styles.img}
                                src={process.env.REACT_APP_BACK_END + post.photo}
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
                            <span className={styles.reactCount}>{likes} people like it</span>
                        </div>
                        <div className={styles.comment} onClick={() => {
                            setShowModal(true)
                        }}>
                            <span className={styles.commentText}>{comments.length} comments</span>
                        </div>
                    </div>
                    {showModal &&
                        <>
                            <hr className={styles.hr} />
                            <div className={styles.comments}>
                                {
                                    comments.map((item) => <AComment
                                        key={item._id}
                                        userId={item.userId}
                                        comment={item.comment}
                                    />)
                                }
                            </div>
                        </>
                    }
                </div>
                {showModal &&
                    <>
                        <MyComment handleComment={handleComment} />
                    </>
                }
            </div>
        </Comp>
    );
}

export default memo(Post)