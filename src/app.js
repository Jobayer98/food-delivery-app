const express = require("express");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')
const path = require('path');

const authRouter = require("./routes/authRoute");
const restaurantRouter = require("./routes/restaurantRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();
const file = fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file)

//middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(express.json());


app.use("/api/v1", authRouter);
app.use("/api/v1", restaurantRouter);
app.use("/api/v1", orderRouter);

app.get("/", (req, res)=>{
    res.send("Welcome to Food Delivery System")

})

// error handler
app.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({
        success: false,
        msg: err.message
    })
})

module.exports = app;