const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        desc: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        comments: {
            type: Array,
            default: []
        },
        photo: {
            type: String
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);