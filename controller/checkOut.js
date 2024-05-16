const productSchema = require("../model/product");
const { User } = require("../model/signup");
const cartSchema = require("../model/cart");
const coupon = require("../model/coupon");
const couponSchema = require("../model/coupon");
const checkOutSchema = require("../model/checkOut")
const profileSchema = require("../model/profile");
const checkOut = require("../model/checkOut");


module.exports = {
  cartToCheckoutGet: async (req, res) => {
    if (req.session.email) {
      try {
      
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userId = user._id;
        const cartData = await cartSchema.findOne({ userId: userId });
        const checkOut = await checkOutSchema.findOne({ userId: userId });
        
        
        const itemPrice = cartData.productDiscounted;

        if(!checkOut){

          await checkOutSchema.create({
            userId:userId,
            total:itemPrice,
            address:[]
          })
        }

        

        let couponData = await couponSchema.find();
        let coupons = [];
        couponData.map((coupon) => {
          if (itemPrice >= coupon.above && itemPrice <= coupon.below) {
            coupons.push(coupon);
          }
        });

        const userprofile = await profileSchema.findOne({ userId: userId })
        const profileData = userprofile?.address;
        
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


        
        const newCheckOut = await checkOutSchema.updateOne({
          userId: userId,
          total:discountedTotel, // Wrap address in an array
      });
        
        
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
        const addressId = req.params.id;
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userId = user._id;
        const userProfile = await profileSchema.findOne({ userId: user._id });
        if (!userProfile) {
          return res.status(404).json({ message: 'Profile not found' });}

        const address = userProfile.address.find(addr => addr._id.toString() === addressId);
        if (!address) {
          return res.status(404).json({ message: 'Address not found' });
      }
      

        // Create a new document using the checkOutSchema and push the address data
        const newCheckOut = await checkOutSchema.updateOne({
            userId: userId,
            address: [address] // Wrap address in an array
        });

        const data =newCheckOut?.address
        console.log(data,'==========');
        res.status(200).json({ message: 'Address saved successfully.', newCheckOut});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
},

}
