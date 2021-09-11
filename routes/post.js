const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const session = { session: false };
const Post = require("../utils/post");

// Creates a post
router.post("/", passport.authenticate("jwt", session), async (req, res) => {
    token = req.query.secret_token;
    await Post.new(req.body.city, req.body.author, req.body.content);
    res.status(201).json({response: "Post created"});
});

// Retrieves all posts from either a user/city (q), search term (v)
router.get("/", passport.authenticate("jwt", session), async (req, res) =>{
    token = req.query.secret_token;
    res.status(200).json({"response": await Post.list(req.query.q, req.query.v)});
});

// Edit post
router.put("/", passport.authenticate("jwt", session), async (req, res) => {
    token = req.query.secret_token;
    await Post.edit(req.body.id, req.body.content);
    res.status(200).json({"response": "Post updated"});
});

// Delete a post
router.delete("/", passport.authenticate("jwt", session), async (req, res) => {
    token = req.query.secret_token;
    await Post.delete(req.query.id);
    res.status(200).json({"response": "Post deleted"});
});

module.exports = router;
