const express = require('express')
const router = express.Router()
// const multer =require('multer')



const userAuth = require('../controller/user')
const wishList = require('../controller/wishlist')




router.get('/',userAuth.userhomeGet)
      .get('/productDetails/:id',userAuth.productdetailsGet)
      .get('/addCart',userAuth.addcartGet)
      .get('/userprofileList',userAuth.userprofilelistGet)
      .get('/addProfile',userAuth.addprofileGet)
      .post('/addProfile',userAuth.addprofilePost)
      .get('/userProfile',userAuth.userprofileGet)
      .get('/editProfile',userAuth.editprofileGet)

      .get('/userProduct',userAuth.allproductsGet)
      
      
      
      .post('/wishlist',wishList.addToWishlist)
      
      .get('/wishlist',wishList.wishlistGet)

        

module.exports=router