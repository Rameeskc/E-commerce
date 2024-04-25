const { default: mongoose } = require("mongoose")
const { User } = require("../model/signup")
const cartSchema = require('../model/cart')


module.exports = {
    addToCart: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.id
                const email = req.session.email
                const user = await User.findOne({ email: email })
                const userobjId = user._id
                const productobjId = new mongoose.Types.ObjectId(productId)
                const cart = await cartSchema.findOne({ userId: userobjId })

                if (!cart) {
                    const newData = new cartSchema({
                        productId: [productobjId],
                        userId: userobjId,
                    });
                    await newData.save();
                } else {
                    if (!cart.productId.includes(productobjId)) {
                        await cartSchema.updateOne(
                            { userId: userobjId },
                            { $push: { productId: productobjId } }
                        );
                    } else {
                        await cartSchema.updateOne(
                            { userId: userobjId },
                            { $pull: { productId: productobjId } }
                        );
                    }
                }

            } catch (error) {
                console.error('Error adding to wishlist:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(202).json("message:false")
        }
    },

    cartGet:async(req, res) => {
        if (req.session.email) {
            const email = req.session.email
            const user = await User.findOne({ email: email })
            const userobjId = user._id
            const cartData = await cartSchema.findOne({ userId: userobjId }).populate({ path: 'productId', model: 'products' })
            res.render('user/cart', { cartData })
        } else {
            res.redirect('/userLogin')
        }

    },
    removeCart:async(req,res)=>{
        if(req.session.email){
            
        }
    }

}