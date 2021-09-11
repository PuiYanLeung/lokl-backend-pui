const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const session = { session: false };
const User = require("../utils/user");

const profile = async (req, res, next) => {
    res.status(200).json({ response: "Profile", user: req.user, token: req.query.secret_token });
};

const register = async (req, res, next) => {
    req.user.username? res.status(200).json({ response: "registered successfully", _id: req.user._id, name: req.user.username }) : res.status(401).json({ error: "User already exists" });
};

const login = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err) {
                res.status(500).json({ msg: "Internal Server Error" });
            } else if (!user) {
                res.status(401).json({ msg: "User not found" });
            } else {
                const fn = async (error) => error? next(error) : res.status(200).json({user: { _id: user._id, name: user.username}, token: jwt.sign( { user: {id: user._id, name: user.username, },},process.env.SECRET_KEY), });
                req.login(user, session, fn);
            }
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

router.post("/register", passport.authenticate("register", session), register);
router.get("/profile", passport.authenticate("jwt", session), profile);
router.post("/login", login);

//Edit User
router.put("/", passport.authenticate("jwt", session), async (req, res) => {
    token = req.query.secret_token;
    try {
        await User.edit(req.body._id, req.body.property, req.body.update);
        res.status(200).json({ response: "User updated" });
    } catch (err) {
        res.status(404).json({ error: "User not found. No user edited!" });
    }
});

//Find User
router.get("/", passport.authenticate("jwt", session), async (req, res) =>{
    token = req.query.secret_token;
    res.status(200).json({ response: await User.read(req.query._id) });
});

//DELETE User
router.delete("/", passport.authenticate("jwt", session), async (req, res) => {
    token = req.query.secret_token;
    try {
        await User.delete(req.query._id);
        res.status(200).json({ response: "User deleted" });
    } catch (err) {
        res.status(404).json({ error: "User not found. No user deleted!" });
    }
});

/*
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
    if (req.body.password !== req.body.passwordVerify) {
        return res.status(400).json({"response": "Entered passwords are not the same"});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const pwdHash = await bcrypt.hash(req.body.password, salt);
    await User.new(req.body.username, req.body.email, pwdHash);
    res.status(201).json({"response": "User added"});
});
*/


module.exports = router;
