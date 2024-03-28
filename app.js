//Libraries

const express=require('express');
const app = express();
const session =require('express-session')


// Routers

const mainRouter = require('./router/mainRouter');
const adminRouter = require('./router/adminRouter')
const { url } = require('inspector');
require('dotenv').config()

// database model

const connectDB=require('./config/db')
const port = process.env.PORT||1999

// session configuration

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
}));


// database connection

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
//dotenv library





//Setting View Engine and Routes
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views',"views")
app.use('/',mainRouter)
app.use('/',adminRouter)





