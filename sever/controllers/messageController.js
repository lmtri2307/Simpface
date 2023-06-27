const Message = require("../models/Message");
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { sendMessage } = require('../socket/socket');

exports.addNewMess = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.body.conversationId).exec()
        const sender = await User.findById(req.body.userId).exec()
        Message.create({
            conversationId: conversation._id,
            text: req.body.message,
            sender: sender._id
        }).then(mess => {
            res.status(200).json(mess)
            sendMessage(conversation._id, {
                message: mess,
                sender: sender
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

exports.getAllMessOfConv = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}