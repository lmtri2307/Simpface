var express = require('express');
var router = express.Router();
const conversationController = require('../controllers/conversationController')

//new conv
router.post("/",  conversationController.newConv);

//get all conv of a user
router.get("/:userId",  conversationController.getConvsOfUser);

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", conversationController.getConv);

module.exports = router;
