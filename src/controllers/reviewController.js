const CustomError = require("../utility/CustomError");
const MenuModel = require("../models/menuModel");

// give a review
const createReview = async (req, res, next) => {
  try {
    const isExistItem = await MenuModel.findById(req.params.menuId);

    if (!isExistItem) {
      throw new CustomError("Item not found", 404);
    }

    const review = {
      user: req.user._id,
      review: req.body.review,
    };

    isExistItem.reviews.push(review);
    await isExistItem.save();

    res.status(201).json({
      success: true,
      data: { review: req.body.review },
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// update the review
const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const updates = Object.keys(req.body);
    const validKeys = ["review"];
    const isValidKey = updates.every((key) => {
      return validKeys.includes(key);
    });

    if (!isValidKey) {
      throw new CustomError("Invalid updates", 400);
    }

    const item = await MenuModel.findById(req.params.menuId);

    if (!item) {
      throw new CustomError("Item not found", 404);
    }

    const reviewIndex = item.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      throw new CustomError("Review not found", 404);
    }

    item.reviews[reviewIndex] = {
      ...req.body,
    };

    await item.save();

    res.status(200).json({
      success: true,
      data: { review: item.reviews[reviewIndex] },
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// remove the review
const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const item = await MenuModel.findById(req.params.menuId);

    if (!item) {
      throw new CustomError("Item not found", 404);
    }

    const reviewIndex = item.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      throw new CustomError("Review not found", 404);
    }

    item.reviews.splice(reviewIndex, 1);
    await item.save();

    res.status(200).json({
      success: true,
      msg: "Review deleted successfully",
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
