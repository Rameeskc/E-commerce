const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
const { User, Admin } = require('../model/signup')
const bcrypt = require('bcrypt');  

// login

const logVerify = async (req,res,next)=>{
    try{
    const email = req.body.email ;
    const enteredPassword = req.body.password ;
    if(!email || !enteredPassword){
        res.redirect('/userLogin')
    }
        const user = await User.findOne({email:email})
        if(!user){
            res.redirect('/userLogin')
        }
        const passwordMatch = await bcrypt.compare(enteredPassword,user.password)
        if(!passwordMatch){
            res.redirect('/userLogin')
        }
        next()
    } catch(error) {
        console.error("Error During In Login",error);
        res.status(500).send("Internal Server Error");
    }
}


// signup

const signVerify = async (req, res, next) => {
    const { name, email, mobileNumber, password, confirmPassword } = req.body;
    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
        // err = `All fields are required`
        res.redirect('/userLogin')
    }else if (password !== confirmPassword) {
        res.redirect('/userLogin')
    }else if (!passwordRegex.test(password)) {
        res.redirect('/userLogin')
    }
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            res.redirect('/userLogin')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = {
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            password: hashedPassword
        }
        await User.create(data)             
        next()
        
    } catch (error) {
        console.error("error during user registration:", error)
        res.status(500).send("Internel Server is Error")
    }
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
    console.log('hello');
    const {name, email, mobileNumber, password, confirmPassword} = req.body;
    console.log(req.body)
    
    if(!name || !email || !mobileNumber || !password || !confirmPassword){
        return res.redirect('/adminSignup')
    }else if(password !== confirmPassword){
        return res.redirect('/adminSignup')
    }
    // }else if(!passwordRegex.test(password)){
    //     return res.redirect('/adminSignup')
    // }
    try{
        const existingUser = await Admin.findOne({email:email})

    console.log(existingUser);
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
        console.log('data:',data);
        await Admin.create(data)

    }catch(error){
        console.error("error during user registration:", error)
    }
    next()
    
    
}


module.exports = {signVerify,logVerify,adminlogVerify,adminsignVerify};