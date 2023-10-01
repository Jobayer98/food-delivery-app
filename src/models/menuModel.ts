import { Schema, model } from "mongoose";

interface Menu {
    name: string,
    description?: string
    price: number
}

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
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant",
    }
})

const MenuModel = model<Menu>("Menu", menuSchema)