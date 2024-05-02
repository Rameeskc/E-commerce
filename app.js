//Libraries
const express=require('express');
const app = express();
const session =require('express-session')
const flash = require('express-flash')

//dotenv library
require('dotenv').config()
const port = process.env.PORT||1999

// database model
const connectDB=require('./config/db')

// database connection
connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})

// session configuration
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
}));

app.use(flash());

//middlewares and settings
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const { url } = require('inspector');
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',"views")

// Routers
const mainRouter = require('./router/mainRouter');
const adminRouter = require('./router/adminRouter')
const userRouter =require('./router/userRouter')

//Setting View Engine and Routes
app.use('/',mainRouter)
app.use('/',adminRouter)
app.use('/',userRouter)





