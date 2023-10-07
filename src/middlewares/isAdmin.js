const User = require("../models/userModel");
const CustomError = require("../utility/CustomError");

const isOwner = async(req, res, next) => {
    try {
        const owner = await User.findById(req.user._id );
        if (!(owner.role === "admin")){
            throw new CustomError("You are not an owner", 400);
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isOwner;