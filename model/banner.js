const mongoose = require('mongoose')


const bannerSchema = new mongoose.Schema({
    bannerText:{
        type:String,
        required:true
    },
    bannerImage:{
        type:String
    }
})

module.exports=mongoose.model('banners',bannerSchema)