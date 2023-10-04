const  CustomError = require("../utility/CustomError")
const User = require("../models/userModel")
const MenuModel = require("../models/menuModel")

const createReview = async(req, res, next) => {
    try {
        const isExistItem = await MenuModel.findById(req.params.menuId);
        
        if (!isExistItem){
            throw new CustomError("Item not found", 404);
        }

        const review = {
            user: req.user._id,
            review: req.body.review
        }
        
        isExistItem.reviews.push(review);
        await isExistItem.save();

        res.status(201).json({
            success: true,
            data: {review: req.body.review}
        })
    } catch (error) {
        next( new CustomError(error, 400) );
    }
}

const updateReview = async(req, res, next) => {
    try {
        const { reviewId } = req.params;
        const updates = Object.keys(req.body);
        const validKeys = ["comment"];
        const isValidKey = updates.every((key) => {
            return validKeys.includes(key);
        });

        if (!isValidKey){
            throw new CustomError("Invalid updates", 400);
        }

         await ReviewModel.findByIdAndUpdate(reviewId, req.body, { customerId: req.user._id}, { new: true, runValidators: true });
         const review = await ReviewModel.findById(reviewId);

        if (!review){
            throw new CustomError("Review not found", 404);
        }

        res.status(200).json({
            success: true,
            data: review
        })
    }catch (error) {
        next( new CustomError(error, 400) );
    }
}
const deleteReview = async(req, res, next) => {
    try {
        const { reviewId } = req.params;

        const review = await ReviewModel.findByIdAndDelete(reviewId);

        if (!review){
            throw new CustomError("Review not found", 404);
        }

        res.status(200).json({
            success: true,
            data: review
        })
    }catch (error) {
        next( new CustomError(error, 400) );
    }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview
}