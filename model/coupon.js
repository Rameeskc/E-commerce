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
    condition:{
        type:String
    }
})

module.exports=mongoose.model('coupons',couponSchema)