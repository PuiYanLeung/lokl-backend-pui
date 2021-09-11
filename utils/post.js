const Post = require("../models/post");

// Adds a post - date is also added as Date.now();
exports.new = async (city, author, content) => await new Post({city, author, content}).save();

// Returns an array of posts from user or city depending on whether "user" or "city" is passed in <query>
exports.list = async (query, variable) => await Post.find({[query]: variable});

// Updates (edits) a post
exports.edit = async (_id, content) => await Post.updateOne({_id}, {content});

// Deletes a post
exports.delete = async (_id) => await Post.deleteOne({_id});
