const User = require("../models/user");

exports.add = async (username, email, pwdHash) => await new User({username, email, pwdHash}).save();

exports.read = async (username) => await User.find({username});

exports.edit = async (username, property, update) =>
    await User.updateOne({username}, {[property]: update});

exports.delete = async (username) => await User.deleteOne({username});
