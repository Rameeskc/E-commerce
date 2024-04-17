const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require('../middleware/multer')
const upload = multer({ storage })



const auth = require('../controller/authcontroller')
const productAuth = require('../controller/product')
const categoryAuth = require('../controller/categories')
const bannerAuth = require('../controller/banner')
const couponAuth = require('../controller/coupon')
const customerAuth = require('../controller/customers')



const validation = require('../middleware/auth')

router.get('/adminHome',auth.adminHome)

      .get('/adminProduct',productAuth.productGet)
      .get('/addProduct',productAuth.addproductGet)
      .post('/addProduct',upload.array('productImage',5),productAuth.addproductPost)
      // .post('/adminProduct',adminAuth.productPost)
      .get('/editProduct/:id',productAuth.editproductGet)
      .post('/editProduct/:id',upload.array('productImage',5),productAuth.editproductPost)
      .get('/deleteProduct/:id',productAuth.deleteproductGet)
      
      .get('/adminCategories',categoryAuth.categoriesGet)
      .get('/addCategories',categoryAuth.addcategoriesGet)
      .post('/addCategories',upload.single('categoryImage'),categoryAuth.addcategoriesPost)
      .get('/editCategories/:id',categoryAuth.editcategoriesGet)
      .post('/editCategories/:id',upload.single('categoryImage'),categoryAuth.editcategoriesPost)
      .get('/deleteCategories/:id',categoryAuth.deletecategoriesPost)

      
      .get('/adminCustomers',customerAuth.customersGet)



      .get('/adminBanner',bannerAuth.bannerGet)
      .get('/addBanner',bannerAuth.addbannerGet)
      .post('/addBanner',upload.single('bannerImage'),bannerAuth.addbannerPost)
      .get('/editBanner/:id',bannerAuth.editbannerGet)
      .post('/editBanner/:id',upload.single('bannerImage'),bannerAuth.editbannerPost)
      .get('/deleteBanner/:id',bannerAuth.deletebannerGet)


      .get('/adminCoupon',couponAuth.couponGet)



module.exports = router