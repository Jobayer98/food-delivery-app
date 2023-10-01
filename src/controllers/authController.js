const User = require("../models/userModel");
const CustomError = require("../utility/CustomError");
const { main } = require("../services/resetPassword");

const signup = async(req, res, next) => {
    try {
        const {email} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            throw new CustomError("Account already exists", 400);
        }

        user = await User.create(req.body);
        // const token =  user.generateToken();

        // res.cookie("access_token", 'Bearer ' + token, {
        //     httpOnly: true,
        //     maxAge: 30000, // 30 seconds

        // })
        res.status(201).json({
            success: true,
            data: user,
            
        })
    } catch (error) {
        next( new CustomError(error, 400) );
    }
}

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError("Account doesn't exist", 400);
        }

        const isMatch = user.comparePassword(password);

        if(!isMatch){
            throw new CustomError("invalid credentials", 401);
        }

        // const token = user.generateToken();

        // res.cookie("access_token", 'Bearer ' + token, {
        //     httpOnly: true,
        //     maxAge: 30000, // 30 seconds
        // })
        res.status(200).json({
            success: true,
            data: user,
            
        })
    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}

const logout = async(req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError("Account doesn't exist", 400);
        }
        user.tokens = [];
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError("Account doesn't exist", 400);
        }

       const mail = await main(email)

       res.status(200).json({
           success: true,
           data: mail.messageId,
       })


    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}

module.exports = {
    signup,
    login,
    logout,
    resetPassword
}