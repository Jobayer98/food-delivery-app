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
    review:{
        type: String,
        trim: true,
        default: null
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant",
    }
})

const MenuModel = model("Menu", menuSchema)

module.exports=MenuModel