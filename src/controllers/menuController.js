const cloudinary = require("cloudinary").v2;
const CustomError = require("../utility/CustomError");
const MenuModel = require("../models/menuModel");
const RestaurantModel = require("../models/restaurantModel");

//show available menus
const getMenus = async (req, res, next) => {
  try {
    const menu = await MenuModel.find();
    if (!menu || menu.length === 0) {
      throw new CustomError("Menus not found", 404);
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// show single menu item
const getMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const item = await MenuModel.findById(menuId);

    if (!item) {
      throw new CustomError("Item not found", 404);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// add a new menu by restaurant owner
const createMenu = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(new CustomError("Please upload an image", 400));
    }

    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "menus",
        width: 500,
        crop: "scale",
      }
    );
    req.body.image = {
      id: result.public_id,
      secure_url: result.secure_url,
    };

    const [id] = await RestaurantModel.where({ ownerId: req.user._id }).select(
      "_id"
    );
    const item = await MenuModel.create({ ...req.body, restaurantId: id._id });

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// show all restaurant owner menus
const showOwnerMenus = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.findOne({ ownerId: req.user._id });
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }
    const menu = await MenuModel.find({ restaurantId: restaurant._id });
    if (!menu || menu.length === 0) {
      throw new CustomError("Menus not found", 404);
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// update menu by restaurant owner
const updateMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;

    if (req.files) {
      await cloudinary.uploader.destroy(user.image?.id);
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "menus",
          width: 500,
          crop: "scale",
        }
      );
      req.body.image = {
        id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    const item = await MenuModel.findByIdAndUpdate(menuId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw new CustomError("Item not found", 404);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

// delete menu by restaurant owner
const deleteMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const item = await MenuModel.findByIdAndDelete(menuId);

    if (!item) {
      throw new CustomError("Item not found", 404);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  updateMenuItem,
  deleteMenuItem,
  showOwnerMenus,
};
