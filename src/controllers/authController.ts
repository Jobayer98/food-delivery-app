import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import CustomError from "../utility/CustomError";

export const signup = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        const token =  user.generateToken();

        res.cookie("access_token", 'Bearer ' + token, {
            httpOnly: true,
            maxAge: 30000, // 30 seconds

        })
        res.status(201).json({
            success: true,
            data: user,
            token
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const login = async(req: Request, res: Response, next: NextFunction) => {
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

        const token = user.generateToken();

        res.cookie("access_token", 'Bearer ' + token, {
            httpOnly: true,
            maxAge: 30000, // 30 seconds
        })
        res.status(200).json({
            success: true,
            data: user,
            token
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
        
    }
}