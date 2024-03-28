const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const adminsignupSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    
    },
    number:{
        type:String,

    },
    password:{
        type:String,

    }
})

module.exports={
    User:mongoose.model('userDetails',signupSchema),
    Admin :mongoose.model('adminDetails',adminsignupSchema)
}