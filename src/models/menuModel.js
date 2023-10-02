const  { Schema, model } = require("mongoose")

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    descriptiion: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant",
    }
})

menuSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "menuId",
})

const MenuModel = model("Menu", menuSchema)

module.exports=MenuModel