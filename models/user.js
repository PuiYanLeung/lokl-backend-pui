const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: {type: String, required: true},
    pwdHash: {type: String, required: true},
    email: {type: String, required: true},
    about: {type: String, default: ""},
});

module.exports = User;
