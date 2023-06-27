const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

exports.updateUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).exec()
        await UserInfo.updateOne(
            { _id: user.userInfo },
            { $set: req.body.info }
        ).exec()
            .then(result => {
                res.status(200).json(req.body.info)
            })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}