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
    image:{
      id: {
        type: String,
        required: true
      },
      secure_url: {
        type: String,
        required: true
      }
    },
    origin: {
        type: String,
        required: true,
        trim: true
    },
    reviews: [{
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
            review: {
              type: String,
              trim: true
            },
            date: {
              type: Date,
              default: Date.now
            }
    }],
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant",
    }
})


const MenuModel = model("Menu", menuSchema)

module.exports=MenuModel