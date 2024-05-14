const productSchema = require("../model/product");
const { User } = require("../model/signup");
const cartSchema = require("../model/cart");
const coupon = require("../model/coupon");
const couponSchema = require("../model/coupon");
const checkOutSchema = require("../model/checkOut")
const profileSchema = require("../model/profile")


module.exports = {
  cartToCheckoutGet: async (req, res) => {
    if (req.session.email) {
      try {
      
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userObjId = user._id;
        const cartData = await cartSchema.findOne({ userId: userObjId });
        const itemPrice = cartData.productDiscounted;

        let couponData = await couponSchema.find();
        let coupons = [];
        couponData.map((coupon) => {
          if (itemPrice >= coupon.above && itemPrice <= coupon.below) {
            coupons.push(coupon);
          }
        });

        const profileData = await profileSchema.find()
        // console.log(profileData);
        

        res.render("user/checkOut", { cartData, coupons ,profileData});
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/userLogin");
    }
  },
  cartToCheckoutPost: (req, res) => {},

  applyCoupon: async (req, res) => {
   
    if (req.session.email) {
      try {
        const couponId = req.body.couponId;
        const couponData = await couponSchema.findOne({_id:couponId})
        const discount = couponData.discount
        const email = req.session.email
        const user = await User.findOne({email:email})
        const userId = user._id;
        const cartData= await cartSchema.findOne({userId:userId})
        const data = cartData.productDiscounted
        const discountedTotel = data-discount


        await checkOutSchema.create({
          userId:userId,
          total:discountedTotel,
          address:[]
        })
        
        
        res.send({ discount, discountedTotel});
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });

      }
    } else {
      res.redirect("/userLogin");
    }
  },

  addressChange: async (req, res) => {
    try {
        const id = req.params.id;
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userId = user._id;
        const address = await profileSchema.findById(id);

        // Create a new document using the checkOutSchema and push the address data
        const newCheckOut = new checkOutSchema({
            userId: userId,
            address: [address] // Wrap address in an array
        });

        await newCheckOut.save();

        res.status(200).json({ message: 'Address saved successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
},

}
