const  express = require("express")
const  { createOrder, showOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/checkout/place-order", auth, createOrder);
router.get("/order-tracking", auth, showOrders);

module.exports=router;