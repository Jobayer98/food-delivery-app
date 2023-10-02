const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/food-delivery").then(() => {
    console.log("DB Connected");
}).catch(e => {
    console.log(e);
    setTimeout(() => {
        connect();
    }, 5000);
})
}
connect();