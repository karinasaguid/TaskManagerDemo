const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter your email address"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;