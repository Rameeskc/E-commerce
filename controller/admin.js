const { log } = require("console")
const productSchema=require("../model/product")

module.exports = {
    // homeGet:(req,res)=>{
    //     res.render('admin/adminHome')
    // },

    productGet:(req,res)=>{
        res.render('admin/adminProduct')
    },

    addproductGet:(req,res)=>{
        res.render('admin/addProduct')
    },
    
    addproductPost:async(req,res)=>{
    const productImage = req.files.map((img) => img.filename);
    try {
      await productSchema.create({ ...req.body, productImage: productImage });
      res.redirect('/adminProduct')
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
    },

    categoriesGet:(req,res)=>{
        res.render('admin/adminCategories')
    },

    categoriesPost:(req,res)=>{
        
    },

    customersGet:(req,res)=>{
        res.render('admin/adminCustomers')
    },

    bannerGet:(req,res)=>{
        res.render('admin/adminBanner')
    },

    couponGet:(req,res)=>{
        res.render('admin/adminCoupon')
    }
}