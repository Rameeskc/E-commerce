const {User,Admin}=require("../model/signup")


// USER


module.exports ={

    // ADMIN


    adminlogGet:(req,res)=>{
        res.render('entry/adminLogin')
        
    },

    adminlogPost:(req,res)=>{
        res.redirect('/adminHome')
    },

    adminsignGet:(req,res)=>{
        res.render('entry/adminSignup')
    },
    
        adminsignPost:(req,res)=>{
        // console.log(req.body)
        res.redirect('/adminLogin')
    },


    adminHome:(req,res)=>{
        res.render('admin/adminHome')
    },


    // user



    userloginGet:(req,res)=>{
        
        res.render('entry/userLogin',{messages: req.flash()})
        
    },


    userloginPost:async(req,res)=>{
        const email= req.body.email;
        const user = await User.findOne({email:email})

        req.session.email = user.email
        req.session.userid=user._id

        // console.log( req.session.userid);
        
        if(req.session.email){
            res.redirect('/')

        }else{
            res.redirect('/userLogin')
        }
    },



    usersignupGet:(req,res)=>{

        res.render('entry/userSignup')
        
        },


    usersignupPost:async (req,res)=>{
        const email = req.body.email;
        const user = await User.findOne({email:email})
        req.session.email = user.email;

        res.redirect('/userLogin')
        
         
    },


    
    userlogoutGet:(req,res)=>{
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            // Redirect the user to the login page after logout
            res.redirect('/userLogin');
        });
    },

    otpGet:(req,res)=>{

    }
}