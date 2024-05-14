const mongoose = require('mongoose')


const couponSchema = new mongoose.Schema({
    couponText:{
        type:String
    },
    date:{
        type:String
    },
    discount:{
        type:Number
    },
    above:{
        type:Number
    },
    below:{
        type:Number
    }
})

module.exports=mongoose.model('coupons',couponSchema)