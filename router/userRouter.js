const express = require('express')
const router = express.Router()
// const multer =require('multer')



const userAuth = require('../controller/user')
const wishList = require('../controller/wishlist')
const cart = require('../controller/cart')
const checkOut = require('../controller/checkOut')
const profile = require('../controller/profile')




router.get('/',userAuth.userhomeGet)
      .get('/productDetails/:id',userAuth.productdetailsGet)
      

      .get('/userprofileList',profile.userprofilelistGet)
      .get('/addProfile',profile.addprofileGet)
      .post('/addProfile',profile.addprofilePost)
      .get('/userProfile',profile.userprofileGet)
      
      .get('/deleteProfile/:id',profile.deleteProfileGet)

      
      
      .get('/userProduct',userAuth.allproductsGet)
      .get('/menproducts',userAuth.menProduct)
      .get('/femaleProduct',userAuth.femaleProduct)
      .get('/kidsProduct',userAuth.kidsProduct)
      
      .post('/addToCart/:id',cart.addToCart)
      .get('/cart',cart.cartGet)
      .get('/removeCart/:id',cart.removeCart)
      .post('/cartInc',cart.updateQuantity)
      
      

      .post('/wishlist',wishList.addToWishlist)
      .get('/wishlistPage',wishList.wishlistGet)
      .get('/removeWishlist/:id',wishList.removewishlistGet)

      .get('/cartToCheckout',checkOut.cartToCheckoutGet)
      .post('/cartToCheckout',checkOut.cartToCheckoutPost)
      .post('/applyCoupon', checkOut.applyCoupon)
      // .post('/addressChange/:id',checkOut.addressChange)
      .post('/razorpay',checkOut.razorpayPost)
      .get('/orderPlaced',checkOut.orderPlacedGet)
      .get('/orderList',checkOut.orderListGet)

        

module.exports=router