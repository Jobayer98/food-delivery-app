const  { Schema, model } = require("mongoose")

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        city: {
            type: String,
            required: true,
            trim: true
        },
        area : {
            type: String,
            required: true,
            trim: true
        }
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

const RestaurantModel = model("Restaurant", restaurantSchema)

module.exports = RestaurantModel;