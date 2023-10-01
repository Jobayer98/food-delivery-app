const express = require("express");
const cors = require('cors');

const authRouter = require("./routes/authRoute");
const restaurantRouter = require("./routes/restaurantRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();

//middleware
app.use(cors())
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", restaurantRouter);
app.use("/api/v1", orderRouter);

// error handler
app.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
    })
})

module.exports = app;