const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    products: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
          quantity: { type: Number },
        },
      ],
        
    totalPrice:{
        type:Number
    },
    address:{
        type:String
    },
    paymentMethod:{
        type:String
    },


})
module.exports = mongoose.model('orders',orderSchema)