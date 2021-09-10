const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const session = {session: false};

const profile = async(req, res, next) =>{
    res.status(200).json({msg: "Profile", user: req.user, token: req.query.secret_token});
};

const register = async(req, res, next) =>{
    req.user.username ? res.status(200).json({msg: "registered successfully", user: req.user}): res.status(401).json({msg:"User already exists"});
};

const login = async(req, res, next) => {
    passport.authenticate("login", async(err, user, info)=>{
        try{
            if (err){
                res.status(500).json({msg:"Internal Server Error"});
            }else if (!user){
                res.status(401).json({msg: "User not found"});
            }else{
                const fn = async(error) => error ? next(error): res.status(200).json({user, token: jwt.sign({user: {id: user.id, name: user.username}}, process.env.SECRET_KEY)});
                req.login(user, session, fn);
            }
        }catch (error){
            return next(error);
        }
    })(req, res, next);
};

router.post("/register", passport.authenticate("register", session), register);
router.get("/profile", passport.authenticate("jwt", session), profile);
router.post("/login", login);

/*
const bcrypt = require("bcrypt");
const User = require("../utils/user");
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

router.get("/", async (req, res) =>
    res.status(200).json({"response": await User.read(req.query.u)})
);

router.put("/", async (req, res) => {
    await User.edit(req.body.username, req.body.property, req.body.update);
    res.status(200).json({"response": "User updated"});
});

router.delete("/", async (req, res) => {
    await User.delete(req.query.u);
    res.status(200).json({"response": "User deleted"});
});
*/

module.exports = router;
