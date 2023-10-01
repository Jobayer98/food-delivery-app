import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderStatus: {
        type: String,
        default: "pending",
        enum: ["pending","confirmed", "delivered", "canceled"],
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
    }],
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }
})

const OrderModel = model("Order", orderSchema);

export default OrderModel;