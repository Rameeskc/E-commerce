const { default: mongoose } = require("mongoose")
const { User } = require("../model/signup")
const cartSchema = require('../model/cart')
const { log } = require("console")


module.exports = {
    addToCart: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.id
                const email = req.session.email
                const user = await User.findOne({ email: email })
                const userobjId = user._id
                const productobjId = new mongoose.Types.ObjectId(productId)
                const cart = await cartSchema.findOne({ userId: userobjId });


                if (!cart) {
                    const newData = new cartSchema({
                        products: { productId: productobjId, quantity: 1 },
                        userId: userobjId,
                    });
                    await newData.save();
                } else {

                    if (!cart.products.some(product => product.productId.equals(productobjId))) {
                        

                        // If the product doesn't exist, update the cart schema
                        await cartSchema.updateOne(
                            { userId: userobjId },
                            { $push: { products: { productId: productobjId, quantity: 1 } } }
                        );
                    }
                   ;
                    
                }

            } catch (error) {
                console.error('Error adding to wishlist:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(202).json("message:false")
        }
    },

    cartGet: async (req, res) => {
        try {
            if (req.session.email) {
                const email = req.session.email;
                const user = await User.findOne({ email: email });
                const userobjId = user._id;
                const cartData = await cartSchema.findOne({ userId: userobjId }).populate('products.productId');

                
                if (cartData && cartData.products) {
                    cartCount = cartData.products.length;
                    
                    const subtotal = cartData.products.reduce((acc,data)=>{
                        return acc+=data.productId.productPrice * data.quantity
                    },0)

                    // const discountAmount = cartData.products.reduce((acc,data)=>{
                    //     return acc+=data.productId.productDiscountedAmount * data.quantity
                    // },0)
                    
                    const totalAmount=cartData.products.reduce((acc,data)=>{
                        return acc+=data.productId.productDiscounted * data.quantity
                    },0)
                    
                
                    const discountAmount = subtotal-totalAmount
                    

                    const cart = await cartSchema.updateOne(
                        {userId:userobjId},
                        {
                            productDiscounted:totalAmount,
                            productPrice:subtotal,
                            productDiscountedAmount:discountAmount
                        },
                        
                    )

                    res.render('user/cart', { cartData , totalAmount, discountAmount,subtotal });
                }
            } else {    
                res.redirect('/userLogin');
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateQuantity: async (req, res) => {
       
        if (req.session.email) {
            
            try {
                const productId = req.query.productId;
                const email = req.session.email;
                const user = await User.findOne({ email: email });
                const userObjId = user._id;
                const quantity = req.body.quantity; // Corrected variable name

                
                const cartData = await cartSchema.updateOne(
                    { userId: userObjId, 'products.productId': productId },
                    { $set: { 'products.$.quantity': quantity } } // Corrected field name
                );

                const cartdetail =  await cartSchema.findOne({ userId: userObjId }).populate('products.productId');

                if (cartdetail && cartdetail.products) {
                    cartCount = cartdetail.products.length;
                    
                    const subtotal = cartdetail.products.reduce((acc,data)=>{
                        return acc+=data.productId.productPrice * data.quantity
                    },0)


                    // const discount = cartdetail.products.reduce((acc,data)=>{
                    //     return acc+=data.productId.productDiscountedAmount * data.quantity
                    // },0)
                    
                    const totalAmount=cartdetail.products.reduce((acc,data)=>{
                        return acc+=data.productId.productDiscounted * data.quantity
                    },0)
                    
                    const discount = subtotal-totalAmount
                    console.log(subtotal,discount);

                    const cart = await cartSchema.updateOne(
                        {userId:userObjId},
                        {
                            productDiscounted:totalAmount,
                            productPrice:subtotal,
                            productDiscountedAmount:discount
                        },
                    )
                    return res.status(200).json({ success: true, message: 'Quantity updated', subtotal, totalAmount, discount });
                    
                } else {    
                    return res.status(404).json({ success: false, message: 'Cart not found' });
                
                }

            } catch (error) {
                console.error('Error updating cart quantity:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    },
    removeCart: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.id;
                const user = await User.findOne({ email: req.session.email });
                const userObjId = user._id;
                console.log(userObjId)

    
                await cartSchema.updateOne({ userId: user._id }, {
                    $pull: { products: { productId: productId } } 
                });
    
                const cartdetail =  await cartSchema.findOne({ userId: userObjId }).populate('products.productId');

                if (cartdetail && cartdetail.products) {
                    cartCount = cartdetail.products.length;
                    
                    const subtotal = cartdetail.products.reduce((acc,data)=>{
                        return acc+=data.productId.productPrice * data.quantity
                    },0)

                    // const discount = cartdetail.products.reduce((acc,data)=>{
                    //     return acc+=data.productId.productDiscountedAmount * data.quantity
                    // },0)
                    
                    const totalAmount=cartdetail.products.reduce((acc,data)=>{
                        return acc+=data.productId.productDiscounted * data.quantity
                    },0)

                    const discount = subtotal-totalAmount
                    

                    const cart = await cartSchema.updateOne(
                        {userId:userObjId},
                        {
                            productDiscounted:totalAmount,
                            productPrice:subtotal,
                            productDiscountedAmount:discount
                        },
                    )
                    return res.status(200).json({ success: true, message: 'Quantity updated', subtotal, totalAmount, discount });   
                    
                // Send the 'ok' message as the response
                res.send({ message: 'ok' , subtotal, totalAmount, discount  });
            } 
            
            }catch (err) {
                console.log(err);
                // Send an error response if something went wrong
                res.status(500).send({ message: 'error' });
            }
        } else {
            // Send a message indicating that the user is not authenticated
            res.status(401).send({ message: 'unauthorized' });
        }
    },
    
    

}