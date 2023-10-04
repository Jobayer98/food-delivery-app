const mongoose = require("mongoose");

const connect = () => {
    const uri = process.env.MONGO_URI;
    
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected");
    })
    .catch(e => {
        console.log(e);
        setTimeout(() => {
            connect();
        }, 5000);
    })
}
connect();