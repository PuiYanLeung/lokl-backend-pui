const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
    city: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

module.exports = Post;
