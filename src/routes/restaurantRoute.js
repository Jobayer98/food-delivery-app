const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant, ownerShowRestaurants } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem, showMenuItem, showOwnerMenus } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")
const isOwner = require("../middlewares/isOwnermiddleware")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

// public restaurant routes
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showOwnerMenus);

// public menu routes
router.get("/menus", showMenus);
router.get("/menus/:menuId", showMenuItem);


// Protected routes
//owner restaurant route
router.post("/restaurant", auth, isOwner, createRestaurant);
router.get("/restaurant/dashboard", auth, isOwner, ownerShowRestaurants);
router.patch("/restaurant/dashboard", auth, isOwner, updateRestaurant);
router.delete("/restaurant/dashboard", auth, isOwner, deleteRestaurant);

// owner menu routes
router.get("/restaurant/dashboard/menus", auth, isOwner, showOwnerMenus);
router.post("/restaurant/dashboard/menu", auth, isOwner, createMenu);
router.patch("/restaurant/dashboard/menus/:menuId", auth, isOwner, updateMenuItem);
router.delete("/restaurant/dashboard/menus/:menuId", auth, isOwner, deleteMenuItem);


// review routes
router.post("/menu/:menuId/review", auth, createReview);
router.patch("/menu/:menuId/review/:reviewId", auth, updateReview);
router.delete("/menu/:menuId/review/:reviewId", auth, deleteReview);

module.exports=router