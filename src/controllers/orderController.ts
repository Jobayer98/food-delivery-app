import {NextFunction, Request, Response} from "express"
import CustomError from "../utility/CustomError"
import OrderModel from "../models/orderModel"

interface CustomRequest extends Request {
    user: {
        _id: string;
    };
}
  
export const createOrder = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const order = await OrderModel.create({...req.body, customerId: req.user._id});
        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const showOrders = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.find({customerId: req.user._id});
        if (!orders){
            throw new CustomError("Orders not found", 404);
        }
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}