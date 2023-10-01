const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")

const router = express.Router();

// restaurant routes
router.post("/restaurants", createRestaurant);
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showSingleRestaurant);
router.patch("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);

// menu routes
router.post("/restaurants/:id/menus", createMenu);
router.get("/restaurants/:id/menus", showMenus);
router.patch("/restaurants/:id/menu/:menuId", updateMenuItem);
router.delete("/restaurants/:id/menu/:menuId", deleteMenuItem);


// review routes
router.post("/restaurants/:id/menu/:menuId/review", createReview);
router.patch("/restaurants/:id/menu/:menuId/review/:reviewId", updateReview);
router.delete("/restaurants/:id/menu/:menuId/review/:reviewId", deleteReview);

export default router