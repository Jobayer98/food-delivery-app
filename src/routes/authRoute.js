const express = require( "express")

const {signup, login, resetPassword, logout} = require ("../controllers/authController")

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/reset", resetPassword)

module.exports=router;