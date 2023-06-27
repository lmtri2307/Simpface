const User = require('../models/User')
const UserInfo = require('../models/UserInfo')
const bcrypt = require('bcrypt');
const tokenHandler = require('../utils/tokenHandler')
const saltRounds = 10;
const { removeOnlineUser } = require('../socket/socket');
const { getPayload } = require('../utils/tokenHandler');


exports.register = async (req, res) => {
    try {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, saltRounds),
            userInfo: (await UserInfo.create({}))._id
        }).then(user => {
            res.send("Register succeed")
        }).catch(err => {
            console.log(err)
            res.send("Register failed")
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.login = async (req, res) => {
    try {
        const account = await User.findOne({
            email: req.body.email,
        }).exec()

        if (!account) {
            throw new Error("User not found")
        }

        const checkHash = await bcrypt.compare(req.body.password, account.password)
        const check = req.body.password === account.password
        if (check || checkHash) {
            const accessToken = tokenHandler.genAcessToken(account)
            res.cookie("jwt", accessToken)
            res.status(200).json(account)
        } else {
            throw new Error("Wrong password")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }


}

exports.checkAuth = async (req, res) => {
    try {
        let username
        try {
            username = tokenHandler.verify(req.cookies.jwt).username
        } catch (error) {
            res.status(403).json(error)
            return
        }
        const user = await User.findOne({
            username: username
        }).exec()
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).send("Logout succeed")
        const userId = getPayload(req.cookies.jwt)._id
        removeOnlineUser(userId)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}