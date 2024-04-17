const express = require('express')
const router = express.Router()


const auth=require('../controller/authcontroller')


const validation = require('../middleware/auth')

router.get('/adminLogin',auth.adminlogGet)
      .post('/adminLogin',validation.adminlogVerify,auth.adminlogPost)
      .get('/adminSignup',auth.adminsignGet)
      .post('/adminSignup',validation.adminsignVerify,auth.adminsignPost)


      .get('/userLogin',auth.userloginGet)
      .post('/userLogin',validation.logVerify,auth.userloginPost)
      .get('/userSignup',auth.usersignupGet)
      .post('/userSignup',validation.signVerify,auth.usersignupPost)
      


      


module.exports=router