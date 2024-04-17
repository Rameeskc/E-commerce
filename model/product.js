const mongoose =require('mongoose')
const { arrayBuffer } = require('stream/consumers')

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    productDiscount:{
        type:String,
        required:true
    },
    productDiscounted:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productQuantity:{
        type:String,
        required:true
    },
    productSize:{
        type:String,
        required:true
    },
    productImage:{
        type:Array,
    },
})

module.exports=mongoose.model('product',ProductSchema)