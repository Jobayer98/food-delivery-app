const  express = require("express")
const  { createOrder, showOrders } = require("../controllers/orderController")

const router = express.Router();

router.post("/checkout/place-order", createOrder);
router.get("/order-history", showOrders);

export default router;