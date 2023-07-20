const Post = require('../models/Post')
const User = require('../models/User')


exports.upload = async (req, res) => {
    try {
        res.status(200).json({ "filePath": "assets/post/" + req.file.filename })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.createPost = async (req, res) => {
    try {
        const username = req.user.username
        const user = await User.findOne({
            username: username
        }).exec()
        Post.create({
            userId: user._id,
            ...req.body
        }).then((result) => {
            res.status(200).json({
                ...result.toObject(),
                user: {
                    username: user.username,
                    profilePicture: user.profilePicture
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).exec()
        const userId = req.user._id
        console.log("Liked: ", post.likes.includes(userId))
        if (!post.likes.includes(userId)) {
            await Post.updateOne({ _id: post._id }, { $push: { likes: userId } })
            res.status(200).send("Liked Post")
        } else {
            await Post.updateOne({ _id: post._id }, { $pull: { likes: userId } })
            res.status(200).send("Disliked Post")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.findPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.userName }).exec()
        const post = await Post.find({ userId: user._id }).exec()
        const postwithInfo = await Promise.all(
            post.map(item => {
                return {
                    ...item.toObject(),
                    user: {
                        username: user.username,
                        profilePicture: user.profilePicture
                    }
                }
            })
        )
        postwithInfo.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
        res.status(200).json(postwithInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.timeline = async (req, res) => {
    try {
        const username = req.user.username
        const user = await User.findOne({
            username: username
        }).exec()
        const posts = (await Promise.all([
            Post.find({ userId: user._id }).exec(),
            ...user.followings.map(friendId =>
                Post.find({ userId: friendId }).exec()
            )
        ])).flat(Infinity)
        const postsWithUser = await Promise.all(
            posts.map(async item => {
                const user = await User.findOne({ _id: item.userId }).exec()
                console.log(user)
                return {
                    ...item.toObject(),
                    user: {
                        username: user.username,
                        profilePicture: user.profilePicture
                    }
                }
            }))
        postsWithUser.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
        console.log("postsWithUser: ", postsWithUser)
        res.status(200).json(postsWithUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.comment = async (req, res) => {
    try {
        const userId = req.user._id
        await Post.updateOne(
            { _id: req.params.postId },
            {
                $push: {
                    comments: {
                        userId: userId,
                        comment: req.body.comment
                    }
                }
            })
        res.status(200).json({
            userId: userId,
            comment: req.body.comment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

