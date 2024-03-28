const express = require('express')
const router = express.Router()


const auth=require('../controller/authcontroller')


const validation = require('../middleware/auth')

router.get('/login',auth.loginGet)
      .post('/login',validation.logVerify,auth.loginPost)
      .get('/signup',auth.signupGet)
      .post('/signup',validation.signVerify,auth.signupPost)


module.exports=router