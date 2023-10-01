import express from "express";

import {signup, login, resetPassword, logout} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/reset", resetPassword)

export default router;