var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User');


router.get('/:usernameOrId', function (req, res, next) {
  userController.findUser(req, res)
})

router.get('/:username/info', function (req, res, next) {
  userController.findUserInfo(req, res)
})

router.get("/:userId/asfriend", function (req, res, next) {
  userController.findFriend(req, res)
})

router.get("/:username/isFollowed", function (req, res, next) {
  userController.isFollow(req, res)
})

router.get('/:username/followings', function (req, res, next) {
  userController.getFollowings(req, res)
})

router.put('/:username/follow', function (req, res, next) {
  userController.followUser(req, res)
})

router.put('/:username/unfollow', function (req, res, next) {
  userController.unFollowUser(req, res)
})

router.get('/:username/cover', function (req, res, next) {
  userController.findCover(req, res)
})

router.get('/:name/find', function (req, res, next) {
  userController.findUsers(req, res)
})



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

router.post('/upload', upload.single("avatar"), function (req, res, next) {
  postController.upload(req, res)

})
router.put('/:userId/changeCover', upload.single("picture"), async (req, res, next) => {
  try {
    User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          coverPicture: `assets/person/${req.file.filename}`
        }
      }
    ).exec()
      .then(() => res.status(200).send(`assets/person/${req.file.filename}`))
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/:userId/changeAvatar', upload.single("picture"), async (req, res, next) => {
  try {
    User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          profilePicture: `assets/person/${req.file.filename}`
        }
      }
    ).exec()
      .then(() => res.status(200).send(`assets/person/${req.file.filename}`))
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router;
