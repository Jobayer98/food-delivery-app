const  { Schema, model } = require("mongoose")

const reviewSchema = new Schema({
    review: {
        type: String,
        trim: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    menuId: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
    }
}, {
    timestamps: true
})

const ReviewModel = model("Review", reviewSchema);

module.exports=ReviewModel;