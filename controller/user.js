const { Console } = require('console')
const bannerSchema = require('../model/banner')
const productSchema = require('../model/product')
const profileSchema = require('../model/profile')
const { User } = require('../model/signup')
const wishlistSchema = require('../model/wishlist')
const wishlist = require('./wishlist')

module.exports = {
    userhomeGet: async (req, res) => {
        const banners = await bannerSchema.find()
        const products = await productSchema.find()
        const userId = req.session.userid 
    //    console.log(req.session.productId,'muees kuttttttaaaaaaa');
        res.render('user/home', { banners, products})
    },

    productdetailsGet: async (req, res) => {
        if (req.session.email) {
            try {
                let wishListIcon = false;
                const id = req.params.id;
                req.session.productId=id
                const productData = await productSchema.findById(id)
                const wishlist = await wishlistSchema.findOne({ userId: req.session.userid })
                if (wishlist && wishlist.productId) {
                    let existProduct = wishlist.productId.find(productId => productId.equals(productData._id));
                    if (existProduct !== undefined) {
                        wishListIcon = true;

                    }
                }
                req.session.wishListIcon=wishListIcon
                console.log('iam juucart',req.session.wishListIcon)
                res.render('user/productDetails', { productData, wishListIcon })
            } catch (err) {
                console.log(err)
            }
        } else {
            res.redirect('/userLogin')
        }

    },

    allproductsGet:async(req,res)=>{

        const products = await productSchema.find()
        const wishlist=await wishlistSchema.find()
        res.render('user/userProduct',{products,wishlist})
    },

    userprofilelistGet: async (req, res) => {
        const profileData = await profileSchema.find()
        res.render('user/userprofileList', { profileData })
    },

    addprofileGet: (req, res) => {
        res.render('user/addProfile')
    },

    addprofilePost: async (req, res) => {
        // console.log(req.body)

        const { name, locality, country, district, state, city, hNo, pin, Phone } = req.body
        try {
            await profileSchema.create({
                Name: name,
                Locality: locality,
                Country: country,
                District: district,
                State: state,
                City: city,
                HouseNo: hNo,
                pinCode: pin,
                Phone: Phone
            })
        } catch (error) {
            // Handle errors
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        res.redirect('/userprofileList')
    },

    userprofileGet: (req, res) => {
        res.render('user/userProfile')
    },

    editprofileGet: (req, res) => {
        res.render('user/editProfile')
    },

    addcartGet: (req, res) => {
        res.render('user/cart')
    },

}