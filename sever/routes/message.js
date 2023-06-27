var express = require('express');
var router = express.Router();
const messageController = require("../controllers/messageController")


//add
router.post("/",  (req, res, next) => {
  messageController.addNewMess(req, res)
});

//get

router.get("/:conversationId", (req, res, next) => {
  messageController.getAllMessOfConv(req, res)
});

module.exports = router;
