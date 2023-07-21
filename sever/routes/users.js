var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { uploadUserImage } = require('../storage');


router.get('/:usernameOrId', userController.findUser)

router.get('/:username/info', userController.findUserInfo)

router.get("/:userId/asfriend", userController.findFriend)

router.get("/:username/isFollowed", userController.isFollow)

router.get('/:username/followings', userController.getFollowings)

router.put('/:username/follow', userController.followUser)

router.put('/:username/unfollow', userController.unFollowUser)

router.get('/:username/cover', userController.findCover)

router.get('/:name/find', userController.findUsers)




router.put('/:userId/changeCover', uploadUserImage, userController.updateCover)

router.put('/:userId/changeAvatar', uploadUserImage, userController.updateAvatar)

module.exports = router;
