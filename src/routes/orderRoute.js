const  express = require("express")
const  { createOrder, showOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/order/create")
router.get("/order/:id")
router.get("/admin/orders")
router.get("/admin/order/:id")
router.delete("/admin/order/:id")

module.exports=router;