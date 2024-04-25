const express = require('express')
const router = express.Router()
// const multer =require('multer')



const userAuth = require('../controller/user')
const wishList = require('../controller/wishlist')
const cart = require('../controller/cart')




router.get('/',userAuth.userhomeGet)
      .get('/productDetails/:id',userAuth.productdetailsGet)
      
      .get('/userprofileList',userAuth.userprofilelistGet)
      .get('/addProfile',userAuth.addprofileGet)
      .post('/addProfile',userAuth.addprofilePost)
      .get('/userProfile',userAuth.userprofileGet)
      .get('/editProfile',userAuth.editprofileGet)
      
      
      .get('/userProduct',userAuth.allproductsGet)
      
      .post('/addToCart/:id',cart.addToCart)
      .get('/cart',cart.cartGet)
      .get('removeCart',cart.removeCart)
      

      .post('/wishlist',wishList.addToWishlist)
      .get('/wishlistPage',wishList.wishlistGet)
      .get('/removeWishlist/:id',wishList.removewishlistGet)

        

module.exports=router