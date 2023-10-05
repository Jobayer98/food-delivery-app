const express = require( "express")
const {signup, login, logout} = require ("../controllers/authController")
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/signup", signup)
router.get("/login", login)
router.post("/logout", auth, logout)

module.exports=router;