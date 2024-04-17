const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        },
    ],
})