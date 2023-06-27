const User = require('../models/User')
const UserInfo = require('../models/UserInfo')
const tokenHandler = require('../utils/tokenHandler')
const {CastError} = require('mongoose')

exports.findUser = async (req, res) => {
    try {
        let user
        try {
            user = await User.findOne({
                _id : req.params.usernameOrId
            }).exec()
        } catch (error) {
            if( error instanceof CastError )
            {
                user = await User.findOne({username: req.params.usernameOrId}).exec()
            } else {
                throw error
            }
        }
        if (!user) {
            throw new Error("Can't find user")
        }
        res.status(200).json(user._doc)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

exports.findFriend = async (req, res) => {
    try {
        const friend = await User.findOne({ _id: req.params.userId }, "profilePicture username").exec()
        res.status(200).json(friend._doc)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.isFollow = async (req, res) => {
    try {
        const username = tokenHandler.getPayload(req.cookies.jwt).username
        const [followUser, currentUser] = await Promise.all([
            User.findOne({ username: req.params.username }).exec(),
            User.findOne({ username: username }).exec()
        ])
        res.status(200).send(currentUser.followings.includes(followUser._id))
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getFollowings = async (req, res) => {
    try {
        const followings = await User.findOne({ username: req.params.username }, "followings").exec()
        res.status(200).send(followings.followings)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.findCover = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .exec()
        if (!user) {
            throw new Error("Can't find user")
        }
        res.status(200).json({
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.followUser = async (req, res) => {
    try {
        const username = tokenHandler.getPayload(req.cookies.jwt).username
        const [currentUser, followUser] = await Promise.all([
            User.findOne({ username: username }).exec(),
            User.findOne({ username: req.params.username }).exec()
        ])
        if (!currentUser.followings.includes(followUser._id)) {
            await Promise.all([
                User.updateOne({ _id: currentUser._id }, { $push: { followings: followUser._id } }),
                User.updateOne({ _id: followUser._id }, { $push: { followers: currentUser._id } })
            ])
            res.status(200).send(followUser._id)
        } else {
            throw new Error('You already follow this user')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.unFollowUser = async (req, res) => {
    try {
        const username = tokenHandler.getPayload(req.cookies.jwt).username

        const [currentUser, followUser] = await Promise.all([
            User.findOne({ username: username }).exec(),
            User.findOne({ username: req.params.username }).exec()
        ])
        if (currentUser.followings.includes(followUser._id)) {
            await Promise.all([
                User.updateOne({ _id: currentUser._id }, { $pull: { followings: followUser._id } }),
                User.updateOne({ _id: followUser._id }, { $pull: { followers: currentUser._id } })
            ])
            res.status(200).send(followUser._id)
        } else {
            throw new Error('You didnt follow this user')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.findUsers = async (req, res) => {
    try {
        const users = await User.find(
            { username: new RegExp(req.params.name, 'i') },
            'username profilePicture'
        ).exec()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.findUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }, "userInfo followings").exec()
        const info = await UserInfo.findById(user.userInfo).exec()
        const toClientKeys = Object.keys(info._doc).filter(key => !["_id", "__v"].includes(key))
        const toClient = toClientKeys.reduce((acc, key) => {
            acc[key] = info._doc[key];
            return acc;
        }, {});
        res.status(200).json(toClient)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}