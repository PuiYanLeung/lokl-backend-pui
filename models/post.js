const mongoose = require("mongoose");

exports.Post = mongoose.model("Post", {
    date: {type: Date, default: Date.now},
    creator: {type: String, required: true},
    content: {type: String, required: true}
});