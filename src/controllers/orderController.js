
const CustomError = require("../utility/CustomError");
const OrderModel = require("../models/orderModel");
const MenuModel = require("../models/menuModel");
const { default: mongoose } = require("mongoose");

  
const createOrder = async(req, res, next) => {
    try {
        const restIds = await Promise.all(req.body.orderItems.map(async (mid) => {
            const menuId = await MenuModel.findById(new mongoose.Types.ObjectId(mid));
            return menuId.restaurantId.toString()
        }));
        const order = await OrderModel.create({...req.body, customerId: req.user._id, restaurantId: [...restIds]});
        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error) {
        next( new CustomError(error, 400) );
    }
}

const showOrders = async(req, res, next) => {
    try {
        const orders = await OrderModel.find({customerId: req.user._id});
        if (!orders){
            throw new CustomError("Orders not found", 404);
        }
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        next( new CustomError(error, 400) );
    }
}

module.exports = {
    createOrder,
    showOrders
}