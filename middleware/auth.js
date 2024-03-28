const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
const { User, Admin } = require('../model/signup')
const bcrypt = require('bcrypt');  

const logVerify = async (req,res,next)=>{
    const email = req.body.email ;
    const enteredPassword = req.body.password ;
    if(!email || !enteredPassword){
        res.redirect('/login')
    }
    try{
        const user = await User.findOne({email:email})
        if(!user){
            res.redirect('/login')
        }
        const passwordMatch = await bcrypt.compare(enteredPassword,User.password)
        if(!passwordMatch){
            res.redirect('/login')
        }
    } catch(error) {
        console.error("Error During In Login",error);
        res.status(500).send("Internal Server Error");
    }
    next()
}




const signVerify = async (req, res, next) => {
    const { name, email, mobileNumber, password, confirmPassword } = req.body;
    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
        // err = `All fields are required`
        res.redirect('/signup')
    }else if (password !== confirmPassword) {
        res.redirect('/signup')
    }else if (!passwordRegex.test(password)) {
        res.redirect('/signup')
    }
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            res.redirect('/signup')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = {
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            password: hashedPassword
        }
        await User.create(data)             
        
    } catch (error) {
        console.error("error during user registration:", error)
        res.status(500).send("Internel Server is Error")
    }
    next()
}


const adminlogVerify = async(req,res,next)=>{
    try{
    const email = req.body.email;
    const enteredPassword = req.body.password;
    if(!email && !enteredPassword){
        return res.redirect('/adminSignup')
    }
        const admin = await Admin.findOne({email:email})
        if(!admin){
            return res.redirect('/adminSignup')
        }
        const passwordMatch = await bcrypt.compare(enteredPassword,admin.password)
        if(!passwordMatch){
            return res.redirect('/adminSignup')
        }
    }catch(error) {
        console.error("Error During In Login",error);
    }
    next()
}




const adminsignVerify=async(req,res,next) => {
    const {name, email, mobileNumber, password, confirmPassword} = req.body;
    if(!name || !email || !mobileNumber || !password || !confirmPassword){
        return res.redirect('/adminSignup')
    }else if(password !== confirmPassword){
        return res.redirect('/adminSignup')
    }else if(!passwordRegex.test(password)){
        return res.redirect('/adminSignup')
    }
    try{
        const existingUser = await Admin.findOne({email:email})

        if(existingUser){
            return res.redirect('/adminSignup')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data ={
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            password: hashedPassword
        }
        await Admin.create(data)

    }catch(error){
        console.error("error during user registration:", error)
    }
    next()
    
    
}


module.exports = {signVerify,logVerify,adminsignVerify,adminlogVerify};