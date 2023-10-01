const  { Schema, model } = require("mongoose")

const deliverySchema = new Schema({
    location: {
       lat: {
           type: Number,
           required: true
       },
       long: {
           type: Number,
           required: true
       }
    },
    arrivalTime: {
        type: Date,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

const DeliveryModel = model("Delivery", deliverySchema);

export default DeliveryModel;