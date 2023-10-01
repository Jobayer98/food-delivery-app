import express from "express";
import { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant } from "../controllers/restaurantController";
import { createMenu, deleteMenuItem, showMenus, updateMenuItem } from "../controllers/menuController";

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

export default router