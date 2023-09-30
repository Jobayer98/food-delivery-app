import express, { Request, Response, NextFunction } from "express";

import User from "../models/userModel";
import CustomError from "../utility/CustomError";

const router = express.Router();

router.post("/signup", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        const token = user.generateToken();

        res.cookie("access_token", 'Bearer ' + token, {
            httpOnly: true,
            maxAge: 30000, // 30 seconds

        })
        res.status(201).json({
            success: true,
            data: user,
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
})

export default router;