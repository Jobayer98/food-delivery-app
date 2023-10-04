const express = require( "express")
const {signup, login, resetPassword, logout} = require ("../controllers/authController")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", auth, logout)
router.post("/reset", resetPassword)

module.exports=router;