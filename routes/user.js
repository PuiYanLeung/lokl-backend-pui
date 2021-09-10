const express = require("express");
const router = express.Router();
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

module.exports = router;
