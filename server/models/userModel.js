const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    contact:{
        type:String,
        required:[true,'Contact is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    cpassword:{
        type:String,
        required:[true,'Confirm Password is required']
    }
},{timestamps:true})

const userModel = mongoose.model('userdata',userSchema);

module.exports = userModel;

