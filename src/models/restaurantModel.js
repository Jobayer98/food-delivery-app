const  { Schema, model } = require("mongoose")

const restaurantSchema = new Schema<Restaurant>({
    name: {
        type: String,
        required: true,
        unique: true,
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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const RestaurantModel = model<Restaurant>("Restaurant", restaurantSchema)

export default RestaurantModel;