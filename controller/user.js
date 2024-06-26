const { Console } = require('console')
const bannerSchema = require('../model/banner')
const productSchema = require('../model/product')

const { User } = require('../model/signup')
const wishlistSchema = require('../model/wishlist')
const wishlist = require('./wishlist')

module.exports = {
    userhomeGet: async (req, res) => {
        const banners = await bannerSchema.find()
        const products = await productSchema.find()
        const userId = req.session.userid 

        res.render('user/home', { banners, products})
    },

    productdetailsGet: async (req, res) => {
    
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
                
                res.render('user/productDetails', { productData, wishListIcon })
            } catch (err) {
                console.log(err)
            }
        

    },

    allproductsGet:async(req,res)=>{

        const products = await productSchema.find()
        const wishlist=await wishlistSchema.find()
        res.render('user/userProduct',{products,wishlist})
    },

    menProduct:async(req,res)=>{
        try{
            const query = { productCategory: 'male' }
            const products = await productSchema.find(query)
            // console.log(product);
            res.render('user/menProduct',{products})
        }catch(err){
            console.log(err);
        }
        
    },
    femaleProduct:async(req,res)=>{
        try{
            const query = { productCategory: 'female' }
            const products = await productSchema.find(query)
            // console.log(product);
            res.render('user/femaleProduct',{products})
        }catch(err){
            console.log(err);
        }
        
    },
    kidsProduct:async(req,res)=>{
        try{
            const query = { productCategory: 'kids' }
            const products = await productSchema.find(query)
            // console.log(products);
            res.render('user/kidsProduct',{products})
        }catch(err){
            console.log(err);
        }
        
    },
    

    
}