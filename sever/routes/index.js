const authRouter = require('./auth')
const conversationRouter = require('./conversation')
const userRouter = require('./users')
const userInfoRouter = require('./userInfo')
const messageRouter = require('./message')
const postRouter = require('./posts')

module.exports = {
    authRouter,
    conversationRouter,
    userRouter,
    userInfoRouter,
    messageRouter,
    postRouter
}