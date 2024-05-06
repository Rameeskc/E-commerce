
module.exports={
    cartToCheckoutGet:(req,res)=>{
        res.render('user/checkOut')
    },
    cartToCheckoutPost:(req,res)=>{

    },

    buyToCheckoutGet:async(req,res)=>{
        if(req.session.email){
            try{
                
            }catch(err){
                console.log(err);
            }
        }
        res.render('user/checkOut')
    },

    buyToCheckoutPost:(req,res)=>{

    }
}