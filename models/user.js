const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: {type: String, required: true, unique: true},
    pwdHash: {type: String, required: true},
   // email: {type: String, required: true},
    email: {type: String, default: ""},
    about: {type: String, default: ""}
});

module.exports = User;
