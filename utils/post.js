const Movie = require("../../group-netflix-app/models/movie");
const Post = require("../models/post");

// Adds a movie
exports.add = async (creator, content) => {
    const post = new Post({
        creator: creator,
        content: content,
    });
    await post.save();
};

// Returns an array of posts from user or city depending on whether "user" or "city" is passed in param
exports.list = async (query, variable) => {
    return await Post.find({[query]: variable});
};

// Updates (edits) a post
exports.update = async (id, content) => {
    await Post.updateOne({_id: id}, {content: content});
};

exports.delete = async (id) => {
    await Post.deleteOne({_id: id});
};
