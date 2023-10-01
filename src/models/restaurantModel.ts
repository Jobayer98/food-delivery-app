import {Types, Schema, model} from "mongoose";

interface Restaurant {
    name: string,
    address: string,
    cuisine: string,
    hoursOfOperation: string,
    phone: string,
    ownerId: Types.ObjectId,

}

const restaurantSchema = new Schema<Restaurant>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {
        type: String,
        required: true,
        trim: true
    },
    hoursOfOperation: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    ownerId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    } as unknown as Types.ObjectId,
})

const RestaurantModel = model<Restaurant>("Restaurant", restaurantSchema)

export default RestaurantModel;