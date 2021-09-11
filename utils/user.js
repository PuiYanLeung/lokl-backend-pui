const User = require("../models/user");

//exports.new = async (username, email, pwdHash) => await new User({username, email, pwdHash}).save();

//exports.read = async (username) => await User.find({username});

//exports.edit = async (username, property, update) => await User.updateOne({username}, {[property]: update});

//exports.delete = async (username) => await User.deleteOne({username});

exports.read = async (_id) => {
    const user = await User.findById(_id);
    const { pwdHash, ...info } = user._doc;
    return info;
}

exports.delete = async (_id) => {
    const user = await User.findByIdAndDelete(_id);
    if(user === null){
        throw new Error("No user deleted!");
    }        
}

exports.edit = async (_id, property, update) => {
    const user = await User.updateOne({_id}, {[property]: update});
    if(user.modifiedCount <= 0){
        throw new Error("No user edited!");
    }        
};

