const Conversation = require("../models/Conversation");

exports.newConv = async (req, res) => {
    try {
        Conversation.create({
            members: [req.body.senderId, req.body.receiverId]
        }).then(result => res.status(200).json(result))
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

exports.getConvsOfUser = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

exports.getConv = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}