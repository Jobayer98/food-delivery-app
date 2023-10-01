const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant, ownerShowRestaurants } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem, showMenuItem } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")
const isOwner = require("../middlewares/isOwnermiddleware")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

//owner restaurant route
router.post("/owner/restaurant", auth, isOwner, createRestaurant);
router.get("/owner/restaurant", auth, isOwner, ownerShowRestaurants);
router.patch("/owner/restaurant", auth, isOwner, updateRestaurant);
router.delete("/owner/restaurant", auth, isOwner, deleteRestaurant);

// restaurant routes
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showSingleRestaurant);

// menu routes
router.get("/restaurants/:id/menus", showMenus);
router.post("/restaurants/:id/menus", auth, isOwner, createMenu);
router.get("/restaurants/:id/menus/:menuId", showMenuItem);
router.patch("/restaurants/:id/menus/:menuId", auth, isOwner, updateMenuItem);
router.delete("/restaurants/:id/menus/:menuId", auth, isOwner, deleteMenuItem);


// review routes
router.post("/restaurants/:id/menu/:menuId/review", auth, createReview);
router.patch("/restaurants/:id/menu/:menuId/review/:reviewId", auth, updateReview);
router.delete("/restaurants/:id/menu/:menuId/review/:reviewId", auth, deleteReview);

module.exports=router