const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant, ownerShowRestaurants } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem, showMenuItem, showOwnerMenus } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")
const isAdmin = require("../middlewares/isAdmin")
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
router.post("/admin", auth, isAdmin, createRestaurant);
router.get("/admin/dashboard", auth, isAdmin, ownerShowRestaurants);
router.patch("/admin/dashboard", auth, isAdmin, updateRestaurant);
router.delete("/admin/dashboard", auth, isAdmin, deleteRestaurant);

// owner menu routes
router.get("/admin/dashboard/menus", auth, isAdmin, showOwnerMenus);
router.post("/admin/dashboard/menu", auth, isAdmin, createMenu);
router.patch("/admin/dashboard/menus/:menuId", auth, isAdmin, updateMenuItem);
router.delete("/admin/dashboard/menus/:menuId", auth, isAdmin, deleteMenuItem);


// review routes
router.post("/menu/:menuId/review", auth, createReview);
router.patch("/menu/:menuId/review/:reviewId", auth, updateReview);
router.delete("/menu/:menuId/review/:reviewId", auth, deleteReview);

module.exports=router