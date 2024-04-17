

module.exports = {
    wishlistGet:(req,res)=>{
        res.render('user/wishlist')
    },

    addToWishList:async(req,res)=>{
        if(req.session.email){
            
            try{
                const productId = req.params.productId
    
                const userId = req.session.user.userId
    
                let wishlist= await wishlistSchema.findOne({user:userId});
                if(!wishlist) {
                    wishlist = new wishlist ({ user:userId, products: []})
                }
                if(wishlist.products.includes(productId)){
                    return res.redirect('/wishlist')
                }else{
                    wishlist.products.push(productId)
                    await wishlist.save()
                    res.redirect('/wishlist')
                }
    
    
            }catch(error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }else {
            res.redirect("/userLogin");
        }    
        
    },
}