import express from "express";
import { createRestaurant, deleteRestaurant, showRestaurants, showSingleRestaurant, updateRestaurant } from "../controllers/restaurantController";

const router = express.Router();

router.post("/restaurants", createRestaurant);
router.get("/restaurants", showRestaurants);
router.get("/restaurants/:id", showSingleRestaurant);
router.patch("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);

export default router