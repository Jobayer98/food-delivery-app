const  { Schema, model } = require("mongoose")

const reviewSchema = new Schema({
    rating: {
        type: Number,
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const ReviewModel = model("Review", reviewSchema);

module.exports=ReviewModel;