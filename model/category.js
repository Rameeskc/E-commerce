const mongoose = require('moongose')

const categorySchema = new mongoose.Schema({
    image:{
        type:String
    },
    category:{
        type:String
    },
    subCategory:{
        type:Array
    }
})