const  { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    shippingInfo:{
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            phone: {
                type: String,
                required: true,
                trim: true
            },
            postalCode: {
                type: String,
                required: true,
                trim: true
            },
        },
    orderStatus: {
        type: String,
        required: true,
        default: "pending",
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    },
    deliveryFee: {
        type: Number,
        required: true,
        trim: true
    },
    orderItems: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        image: {
            id: String,
            secure_url: String
        },
        menu: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
        }

    }],
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const OrderModel = model("Order", orderSchema);

module.exports=OrderModel;