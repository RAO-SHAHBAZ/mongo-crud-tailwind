import mongoose from "mongoose";

const order = mongoose.Schema({
    name:String,
    address:String,

})

const Order = mongoose.model('Order' , order)

export default Order