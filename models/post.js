const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
    date: {type: Date, default: Date.now},
    creator: {type: String, required: true},
    content: {type: String, required: true},
});

module.exports = Post;
