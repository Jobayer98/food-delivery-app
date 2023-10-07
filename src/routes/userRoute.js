const express = require( "express")
const auth = require("../middlewares/auth.middleware")
const {userDashboard, updateUserInfo, forgotPassword, resetPassword, updateUserPassword, uploadUserPhoto} = require("../controllers/userController")

const router = express.Router();

router.get("/userdashboard", auth, userDashboard)
router.patch("/userdashboard/update", auth, updateUserInfo)
router.post("/user/upload-image", auth, uploadUserPhoto)
router.patch("/user/update-password", auth, updateUserPassword)
router.get("/forgot-password", auth, forgotPassword)
router.post("/password/reset/:token", auth, resetPassword)

module.exports=router;