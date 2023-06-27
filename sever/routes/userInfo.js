var express = require('express');
var router = express.Router();
const userInfoController = require('../controllers/userInfoController')


router.put('/:username',  (req, res, next) => {
    userInfoController.updateUserInfo(req, res)
})

module.exports = router;