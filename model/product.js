const mongoose =require('mongoose')
const { arrayBuffer } = require('stream/consumers')

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDiscount:{
        type:Number,
        required:true
    },
    productDiscounted:{
        type:Number,
        required:true
    },
    productDiscountedAmount:{
        type:Number,
        require:true
    },
    productColor:{
        type:String
    },
    productCategory:{
        type:String
    },
    productDescription:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productSize:{
        type:String,
        required:true
    },
    productImage:{
        type:Array,
    },
    disable:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model('products',ProductSchema)