const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant, ownerShowRestaurants } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem, showMenuItem, showOwnerMenus } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")
const isOwner = require("../middlewares/isOwnermiddleware")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

//owner restaurant route
router.post("/restaurant", auth, isOwner, createRestaurant);
router.get("/restaurant/dashboard/:restaurantName", auth, isOwner, ownerShowRestaurants);
router.patch("/restaurant/dashboard/:restaurantName", auth, isOwner, updateRestaurant);
router.delete("/restaurant/dashboard/:restaurantName", auth, isOwner, deleteRestaurant);

// restaurant routes
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showSingleRestaurant);

// menu routes
router.get("/rest/menus", showMenus);
router.get("/restaurant/dashboard/menus", auth, isOwner, showOwnerMenus);
router.post("/restaurant/dashboard/menus", auth, isOwner, createMenu);
router.get("/restaurant/dashboard/:menuId", showMenuItem);
router.patch("/restaurant/dashboard/menus/:menuId", auth, isOwner, updateMenuItem);
router.delete("/rrestaurant/dashboard/menus/:menuId", auth, isOwner, deleteMenuItem);


// review routes
router.post("/menu/review", auth, createReview);
router.patch("/menu/review/:reviewId", auth, updateReview);
router.delete("/menu/review/:reviewId", auth, deleteReview);

module.exports=router