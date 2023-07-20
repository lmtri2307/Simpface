var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User');


router.get('/:usernameOrId', userController.findUser)

router.get('/:username/info', userController.findUserInfo)

router.get("/:userId/asfriend", userController.findFriend)

router.get("/:username/isFollowed", userController.isFollow)

router.get('/:username/followings', userController.getFollowings)

router.put('/:username/follow', userController.followUser)

router.put('/:username/unfollow', userController.unFollowUser)

router.get('/:username/cover', userController.findCover)

router.get('/:name/find', userController.findUsers)



var multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/person');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });
router.put('/:userId/changeCover', upload.single("picture"), userController.updateCover)

router.put('/:userId/changeAvatar', upload.single("picture"), userController.updateAvatar)

module.exports = router;
