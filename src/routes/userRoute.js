const express = require( "express")
const auth = require("../middlewares/auth.middleware")
const {userDashboard, updateUserInfo, forgotPassword, resetPassword, updateUserPassword} = require("../controllers/userController")

const router = express.Router();

router.get("/userdashboard", auth, userDashboard)
router.patch("/userdashboard/update", auth, updateUserInfo)
router.patch("/user/update-password", auth, updateUserPassword)
router.get("/forgotpassword", auth, forgotPassword)
router.post("/password/reset/:token", auth, resetPassword)

module.exports=router;