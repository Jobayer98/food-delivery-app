import { Request, Response, NextFunction } from "express";
import CustomError from "../utility/CustomError";
import MenuModel from "../models/menuModel";
export const showMenus = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const menu = await MenuModel.find();
        if (!menu){
            throw new CustomError("Menus not found", 404);
        }

        res.status(200).json({
            success: true,
            data: menu
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
        
    }
}

export const showMenuItem = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const item = await MenuModel.findById(id);
        
        if (!item){
            throw new CustomError("Item not found", 404);
        }

        res.status(200).json({
            success: true,
            data: item
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const createMenu = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await MenuModel.create(req.body);
        
        res.status(201).json({
            success: true,
            data: item
        })

    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const updateMenuItem = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updates = Object.keys(req.body);
        const validKeys = ["name", "description", "price"];

        const isValidKey = updates.every((key) => {
            return validKeys.includes(key);
        })

        if(!isValidKey){
            throw new CustomError("Invalid updates", 400);
        }

        const item = await MenuModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!item){
            throw new CustomError("Item not found", 404);
        }

        res.status(200).json({
            success: true,
            data: item
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}

export const deleteMenuItem = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const item = await MenuModel.findByIdAndDelete(id);
        
        if (!item){
            throw new CustomError("Item not found", 404);
        }

        res.status(200).json({
            success: true,
            data: item
        })
    } catch (error: any) {
        next( new CustomError(error, 400) );
    }
}