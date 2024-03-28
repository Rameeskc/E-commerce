const {User,Admin}=require("../model/signup")


module.exports ={
    loginGet:(req,res)=>{
        if(req.session.email){
            res.redirect('/user')
        }else{
            res.render('entry/login')
        }
    },


    loginPost:async(req,res)=>{
        const email= req.body.email;
        const user = await User.findOne({email:email})

        req.session.email =user.email
        console.log('user')
        res.redirect('/userHome')
    },



    logoutGet:(req,res)=>{
        res.redirect()
    },


    signupGet:(req,res)=>{
        res.render('entry/signup')
    },


    signupPost:async (req,res)=>{
         
         res.redirect('/login')
    },




    adminlogGet:(req,res)=>{
        res.render('admin/adminLogin')
    },

    adminlogPost:(req,res)=>{
        res.redirect('/adminHome')
    },

    adminsignGet:(req,res)=>{
        res.render('admin/adminSignup')
    },
    
    adminsignPost:(req,res)=>{
        console.log(req.body)
        res.redirect('/adminLogin')
    },
    adminHome:(req,res)=>{
        res.render('admin/adminHome')
    }
    
}