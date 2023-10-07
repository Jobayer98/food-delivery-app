const  express = require("express")
const  { createOrder, showOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/order/create", auth, createOrder)
router.get("/my-order", auth, showOrders)

// admin routes
router.get("/admin/orders")
router.get("/admin/order/:id")
router.delete("/admin/order/:id")

module.exports=router;