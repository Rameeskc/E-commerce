const wishlistSchema = require('../model/wishlist')
const ProductSchema = require('../model/product');
const { default: mongoose } = require('mongoose');
const { User } = require('../model/signup');

module.exports = {

    addToWishlist: async (req, res) => {

        if (req.session.email) {
            try {
                // console.log('Adding to wishlist');
                const productId = req.query.id;
                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }
                const email = req.session.email
                const user = await User.findOne({ email: email })
                const userObjId = user._id;

                const productObjId = new mongoose.Types.ObjectId(productId);
                let wishlist = await wishlistSchema.findOne({ userId: userObjId });

                if (!wishlist) {
                    const newData = new wishlistSchema({
                        productId: [productObjId],
                        userId: userObjId,
                    });
                    await newData.save();
                } else {
                    if (!wishlist.productId.includes(productObjId)) {
                        await wishlistSchema.updateOne(
                            { userId: userObjId },
                            { $push: { productId: productObjId } }
                        );
                    } else {
                        await wishlistSchema.updateOne(
                            { userId: userObjId },
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


    wishlistGet: async (req, res) => {
        if (req.session.email) {
            const email = req.session.email
            const user = await User.findOne({ email: email })
            const userobjId = user._id
            const wishdata = await wishlistSchema.findOne({ userId: userobjId }).populate({ path: 'productId', model: 'products' })
            res.render('user/wishlist', { wishdata })
        } else {
            res.redirect('/userLogin')
        }

    },


    removewishlistGet: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.id
                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }
                const email = req.session.email
                const user = await User.findOne({ email: email })
                const userobjId = user._id
                const productObjId = new mongoose.Types.ObjectId(productId);
                const wishdata = await wishlistSchema.findOne({ userId: userobjId })

                if (wishdata.productId.includes(productObjId)) {
                    await wishlistSchema.updateOne(
                        { userId: userobjId },
                        { $pull: { productId: productObjId } }
                    )
                }
                res.status(200).send({message:"ok"})
                
            }catch(err){
                console.log(err)
            }  

        }
    }
}