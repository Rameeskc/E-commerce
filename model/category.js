const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    categoryName:{
        type:String
    },
    subcategoryName:[{
        type:String
    }],


    categoryImage:{
        type:Array
    }
})
module.exports=mongoose.model('categories',categorySchema)