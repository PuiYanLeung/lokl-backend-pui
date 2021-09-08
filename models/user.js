const mongoose = require("mongoose");

exports.User = mongoose.model("User", {
    username: {type: String, required: true},
    passwordHash: {type: String, required: true},
    email: {type: String, required: true},
    about: {type: String, default: ""}
});