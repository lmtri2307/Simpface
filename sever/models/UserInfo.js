const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            max: 30,
            default: ""
        },
        from: {
            type: String,
            max:30,
            default: ""
        },
        relation: {
            type: String,
            max: 30,
            default: ""
        }
    },
);

module.exports = mongoose.model("UserInfo", UserInfoSchema);