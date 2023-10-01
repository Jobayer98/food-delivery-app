import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import CustomError from "../utility/CustomError";

interface AuthRequest extends Request {
  token: string;
  user?: any;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") || '';
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');

    const user = await User.findOne({
      _id: decoded._id,
      email: decoded.email,
      "tokens.token": token,
    });

    if (!user) {
      return next(new CustomError("Authentication failed", 401));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;


