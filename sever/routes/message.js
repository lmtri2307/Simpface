var express = require('express');
var router = express.Router();
const messageController = require("../controllers/messageController")


//add
router.post("/",  messageController.addNewMess);

//get

router.get("/:conversationId", messageController.getAllMessOfConv);

module.exports = router;
