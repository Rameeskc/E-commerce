const mongoose = require('mongoose')
const product = require('./product')


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    products: [
        { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, 
          quantity: { type: Number }, _id: false }
    ],
    total:{
        type:Number,
        
    }


})

module.exports = mongoose.model('carts', cartSchema)