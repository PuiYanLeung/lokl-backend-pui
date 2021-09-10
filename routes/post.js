const express = require("express");
const Post = require("../utils/post");
const router = express.Router();

const post = require("../utils/post");

// Creates a post
router.post("/", async (req, res) => {
    await post.add(req.body.creator, req.body.content);
    res.status(201).json({response: "Post created"});
});

// Retrieves all posts from either a user/city (q), search term (v)
router.get("/", async (req, res) =>
    res.status(200).json({response: await Post.list(req.query.q, req.query.v)})
);

// Edit post
router.put("/", async (req, res) => {
    await Post.update(req.body.id, req.body.content);
    res.status(200).json({response: "Post updated"});
});

// Delete a post
router.delete("/", async (req, res) => {
    await Post.delete(req.query.id);
    res.status(200).json({response: "Post deleted"});
});
