var express = require('express');
var router = express.Router();
const userInfoController = require('../controllers/userInfoController')


router.put('/:username',  userInfoController.updateUserInfo)

module.exports = router;