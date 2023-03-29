const mongoose = require('mongoose');

const carSchema =  mongoose.Schema({
    carname:{
        type:String,
        required:[true,'carname is required']
    },
    type:{
        type:String,
    },
    model:{
        type:String,
        required:[true,'model is required']
    },
    milage:{
        type:Number,
        required:[true,'milage is required']
    },
    perkm:{
        type:Number,
        required:[true,'perkm is required']
    },
    availablefrom:{
        type:String,
        required:[true,'availablefrom date is required']
    },
    availabletill:{
        type:String,
        required:[true,'availabletill date is required']
    },
    image:{
        type:String
    },
    description:{
        type:String,
    },
    cardetails:{
        type:String,
        required:[true,'name is required']
    },
    details:{
        type:String,
    }
})

const Cardetails = mongoose.model('Cardetails',carSchema)


module.exports = Cardetails;