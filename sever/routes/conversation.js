var express = require('express');
var router = express.Router();
const conversationController = require('../controllers/conversationController')

//new conv
router.post("/",  (req, res, next ) => {
 conversationController.newConv(req, res)
});

//get all conv of a user
router.get("/:userId",  (req, res, next) => {
  conversationController.getConvsOfUser(req, res)
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", (req, res, next) => {
  conversationController.getConv(req, res)
});

module.exports = router;
