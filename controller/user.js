const bannerSchema = require('../model/banner')
const productSchema = require('../model/product')
const profileSchema = require('../model/profile')

module.exports={
    userhomeGet:async(req,res)=>{
        const banners = await bannerSchema.find()
        const products = await productSchema.find()
        if(req.session.email){
            res.render('user/home',{banners,products})
        }else{
            res.redirect('/userLogin')
        }
    },

    productdetailsGet:async(req,res)=>{
        const id =req.params.id;
        const productData = await productSchema.find()
        // console.log(productData);
        res.render('user/productDetails',{productData})
    },

    userprofilelistGet:async(req,res)=>{
        const profileData = await profileSchema.find()
        res.render('user/userprofileList',{profileData})
    },

    addprofileGet:(req,res)=>{
        res.render('user/addProfile')
    },

    addprofilePost:async(req,res)=>{
        // console.log(req.body)

        const {name,locality,country,district,state,city,hNo,pin,Phone} = req.body
        try{
            await profileSchema.create({
                Name:name,
                Locality:locality,
                Country:country,
                District:district,
                State:state,
                City:city,
                HouseNo:hNo,
                pinCode:pin,
                Phone:Phone
            })
        }catch (error) {
            // Handle errors
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        res.redirect('/userprofileList')
    },
    
    userprofileGet:(req,res)=>{
        res.render('user/userProfile')
    },

    editprofileGet:(req,res)=>{
        res.render('user/editProfile')
    },

    addcartGet:(req,res)=>{
        res.render('user/cart')
    },
    
}