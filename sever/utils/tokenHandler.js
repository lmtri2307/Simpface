const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
const { addOnlineUser } = require('../socket/socket');
const jwt = require('jsonwebtoken')

const toClient = ['username', "_id"]
const genAcessToken = (user) => {
    const payload = toClient.reduce((acc, key) => {
        acc[key] = user[key];
        return acc;
    }, {});
    const token = jwt.sign(payload, secret, { expiresIn: "1h" })
    return token
}


const verify = (token) => {
    const payload = jwt.verify(token, secret)
    return payload
}

const verifyUser = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        res.status(403).send("Token is missing")
        return
    }

    try {
        const user = verify(token)
        req.user = user
        addOnlineUser(user._id)
    } catch (error) {
        console.log(error)
        res.status(403).json(error)
        return
    }
    next()
}

module.exports = {
    genAcessToken,
    verify,
    verifyUser
}