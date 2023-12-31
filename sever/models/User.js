const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo'
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "assets/person/noAvatar.png",
        },
        coverPicture: {
            type: String,
            default: "assets/person/noCover.png",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);