const wishlistSchema = require('../model/wishlist')
const ProductSchema = require('../model/product');
const { default: mongoose } = require('mongoose');

module.exports = {

    addToWishlist: async (req, res) => {
        if (req.session.email) {
        try {
                // console.log('Adding to wishlist');
                const productId = req.query.id;
                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }
                const _id = req.session.email._id;
                const userObjId = new mongoose.Types.ObjectId(_id);
                const productObjId = new mongoose.Types.ObjectId(productId);
                let wishlist = await wishlistSchema.findOne({ userId: _id });
                
                if (!wishlist) {
                    const newData = new wishlistSchema({
                        productId: [productObjId],
                        userId: userObjId,
                    });
                    await newData.save();
                } else {
                    if (!wishlist.productId.includes(productObjId)) {
                        await wishlistSchema.updateOne(
                            { userId: _id },
                            { $push: { productId: productObjId } }
                            );
                        }else{
                            await wishlistSchema.updateOne(
                                { userId: _id },
                                { $pull: { productId: productObjId } }
                                ); 
                        }
                    }
                    
                    res.status(200).json({ message: 'Added to wishlist' });

                } catch (error) {
                    console.error('Error adding to wishlist:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            } else {
                res.status(202).json("message:false")
            }
    },



    // wishlistGet: async (req, res) => {
    //     try {
    //         const { user } = req.session;
    //         if (!user) {
    //             return res.redirect('/userLogin')
    //         }
    //         const wishlist = await wishlistSchema.findOne({ userId: user })
    //         let products = [];
    //         if (wishlist) {
    //             for (const ele of wishlist.productId) {
    //                 let product = await ProductSchema.findOne({ _id: ele })
    //                 products.push(product);
    //             }
    //             res.render("user/wishlist", { products });
    //         } else {
    //             res.render('user/wishlist', { products })
    //         }
    //     } catch (err) {
    //         console.log("wishlist target error", err)
    //     }
    // }
    wishlistGet:async(req,res)=>{
        if(req.session.email){
            res.render('user/wishlist')
        }else{
            res.redirect('/userLogin')
        }
        
    }
}