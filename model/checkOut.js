const mongoose = require('mongoose')
const checkOut = require('../controller/checkOut')

const checkOutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    // products: [
    //     { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, 
    //       quantity: { type: Number }, _id: false }
    // ],

    total:{
        type:Number
    },
    // address:[{  
        
    // }]
})

module.exports = mongoose.model('checkOuts',checkOutSchema)