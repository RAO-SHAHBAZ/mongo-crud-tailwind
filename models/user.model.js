import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    company:String,
    email:String,
    country:String,
    number:Number,
    img:String,
    message:String,
})

const User =  mongoose.model('User' , userSchema)

export default User