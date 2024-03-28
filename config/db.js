const mongoose = require('mongoose')
const mongourl = "mongodb://localhost:27017/myfristproject"


const connectDB = async() =>{
    try{
        await mongoose.connect(mongourl)
        console.log(`database connected`)
    }catch(err){
        console.log("not connected"+ err)
    }
}

module.exports= connectDB