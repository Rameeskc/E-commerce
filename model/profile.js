const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    address:[{
        Name :{
            type:String
        },
        Locality:{
            type:String
        },
        Country:{
            type:String
        },
        District:{
            type:String
        },
        State:{
            type:String
        },
        City:{
            type:String
        },
        HouseNo:{
            type:Number
        },
        pinCode:{
            type:Number
        },
        Phone:{
            type:Number
        }
    }]
})

module.exports=mongoose.model('profile',profileSchema)