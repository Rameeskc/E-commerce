const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = require('../middleware/multer')
const upload = multer({ storage })



const auth = require('../controller/authcontroller')
const adminAuth = require('../controller/admin')

const validation = require('../middleware/auth')

router.get('/adminLogin',auth.adminlogGet)
      .post('/adminLogin',validation.adminlogVerify,auth.adminlogPost)
      .get('/adminSignup',auth.adminsignGet)
      .post('/adminSignup',validation.adminsignVerify,auth.adminsignPost)
      .get('/adminHome',auth.adminHome)
      .get('/adminProduct',adminAuth.productGet)
      .get('/addProduct',adminAuth.addproductGet)
      .post('/addProduct',upload.array('productImage',5),adminAuth.addproductPost)
      // .post('/adminProduct',adminAuth.productPost)
      .get('/adminCategories',adminAuth.categoriesGet)
      .get('/adminCustomers',adminAuth.customersGet)
      .get('/adminBanner',adminAuth.bannerGet)
      .get('/adminCopen',adminAuth.couponGet)



module.exports = router