const Movie = require("../../group-netflix-app/models/movie");
const Post = require("../models/post");

// Adds a post - date is also added as Date.now();
exports.add = async (creator, content) => await new Post({creator, content}).save();

// Returns an array of posts from user or city depending on whether "user" or "city" is passed in <query>
exports.list = async (query, variable) => await Post.find({[query]: variable});

// Updates (edits) a post
exports.update = async (_id, content) => await Post.updateOne({_id}, {content});

// Deletes a post
exports.delete = async (_id) => await Post.deleteOne({_id});
