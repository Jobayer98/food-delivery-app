const express = require( "express")
const {signup, login, resetPassword, logout} = require ("../controllers/authController")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/auth/signup", signup)
router.post("/auth/signin", login)
router.post("/auth/logout", auth, logout)
router.post("/auth/reset", resetPassword)

module.exports=router;