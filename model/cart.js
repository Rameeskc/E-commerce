const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true
    },
    productId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        },
    ],
})

module.exports= mongoose.model('carts',cartSchema)