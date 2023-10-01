const express = require("express")
const { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant, ownerShowRestaurants, ownerSingleRestaurant } = require("../controllers/restaurantController")
const { createMenu, deleteMenuItem, showMenus, updateMenuItem } = require("../controllers/menuController")
const { createReview, deleteReview, updateReview } = require("../controllers/reviewController")

const router = express.Router();

//owner restaurant route
router.post("/owner/restaurants", createRestaurant);
router.get("/owner/restaurants", ownerShowRestaurants);
router.get("/owner/restaurants/:id", ownerSingleRestaurant);
router.patch("owner/restaurants/:id", updateRestaurant);
router.delete("owner/restaurants/:id", deleteRestaurant);

// restaurant routes
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showSingleRestaurant);

// menu routes
router.post("/restaurants/:id/menus", createMenu);
router.get("/restaurants/:id/menus", showMenus);
router.patch("/restaurants/:id/menu/:menuId", updateMenuItem);
router.delete("/restaurants/:id/menu/:menuId", deleteMenuItem);


// review routes
router.post("/restaurants/:id/menu/:menuId/review", createReview);
router.patch("/restaurants/:id/menu/:menuId/review/:reviewId", updateReview);
router.delete("/restaurants/:id/menu/:menuId/review/:reviewId", deleteReview);

module.exports=router