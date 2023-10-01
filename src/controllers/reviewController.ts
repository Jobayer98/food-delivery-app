import { Request, Response, NextFunction } from "express";
import ReviewModel from "../models/reviewModel";
import CustomError from "../utility/CustomError";

interface CustomRequest extends Request {
    user: {
        _id: string;
    };
}
export const createReview = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const review = await ReviewModel.create({...req.body, customerId: req.user._id});
        res.status(201).json({
            success: true,
            data: review
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const updateReview = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;
        const updates = Object.keys(req.body);
        const validKeys = ["rating", "comment"];
        const isValidKey = updates.every((key) => {
            return validKeys.includes(key);
        });

        if (!isValidKey){
            throw new CustomError("Invalid updates", 400);
        }

        const review = await ReviewModel.findByIdAndUpdate(reviewId, req.body, { new: true, runValidators: true });

        if (!review){
            throw new CustomError("Review not found", 404);
        }

        res.status(200).json({
            success: true,
            data: review
        })
    }catch (error: any) {
        next( new CustomError(error, 400) );
    }
}
export const deleteReview = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;

        const review = await ReviewModel.findByIdAndUpdate(reviewId, req.body, { new: true, runValidators: true });

        if (!review){
            throw new CustomError("Review not found", 404);
        }

        res.status(200).json({
            success: true,
            data: review
        })
    }catch (error: any) {
        next( new CustomError(error, 400) );
    }
}