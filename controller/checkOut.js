const productSchema = require("../model/product");
const { User } = require("../model/signup");
const cartSchema = require("../model/cart");
const coupon = require("../model/coupon");
const couponSchema = require("../model/coupon");
const checkOutSchema = require("../model/checkOut");
const profileSchema = require("../model/profile");
const checkOut = require("../model/checkOut");
const orderSchema = require("../model/order");
const Razorpay = require("razorpay")
const Razorpay_key = process.env.RAZORPAY_KEY_ID
const Razorpay_secret_key = process.env.RAZORPAY_KEY_SECRET





var instance = new Razorpay({
     
  key_id:Razorpay_key,
  key_secret:Razorpay_secret_key

})

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

        if (!checkOut) {
          await checkOutSchema.create({
            userId: userId,
            total: itemPrice,
            address: [],
          });
        }

        let couponData = await couponSchema.find();
        let coupons = [];
        couponData.map((coupon) => {
          if (itemPrice >= coupon.above && itemPrice <= coupon.below) {
            coupons.push(coupon);
          }
        });

        const userprofile = await profileSchema.findOne({ userId: userId });
        const profileData = userprofile?.address;

        // console.log(profileData);

        res.render("user/checkOut", { cartData, coupons, profileData });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/userLogin");
    }
  },

  applyCoupon: async (req, res) => {
    if (req.session.email) {
      try {
        const couponId = req.body.couponId;
        const couponData = await couponSchema.findOne({ _id: couponId });
        const discount = couponData.discount;
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userId = user._id;
        const cartData = await cartSchema.findOne({ userId: userId });
        const data = cartData.productDiscounted;
        const total = cartData.productPrice;
        const discountedTotel = data - discount;

        const newCheckOut = await checkOutSchema.updateOne({
          userId: userId,
          total: discountedTotel, // Wrap address in an array
        });

        res.send({ discount, discountedTotel, total });
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
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
        return res.status(404).json({ message: "Profile not found" });
      }

      const address = userProfile.address.find(
        (addr) => addr._id.toString() === addressId
      );
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }

      // Create a new document using the checkOutSchema and push the address data
      const newCheckOut = await checkOutSchema.updateOne({
        userId: userId,
        address: [address], // Wrap address in an array
      });

      res.status(200).json({ message: "Address saved successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    }
  },
  cartToCheckoutPost : async (req, res) => {
    try {
      if (req.session.email) {
        const { paymentAddress, paymentMethod } = req.body;
        const newAddress = paymentAddress.trim();
        req.session.paymentMethod = paymentMethod;
        req.session.paymentAddress = newAddress;
  
        const email = req.session.email;
        const user = await User.findOne({ email: email });
        const userId = user._id;
  
        if (paymentMethod == "COD") {
          const cartdetail = await cartSchema.findOne({ userId: userId }).populate("products.productId");
          const checkoutData = await checkOut.findOne({ userId: userId });
          const total = checkoutData.total;
  
          const newData = new orderSchema({
            userId: userId,
            products: cartdetail.products,
            totalPrice: total,
            address: newAddress,
            paymentMethod: paymentMethod,
          });
  
          await newData.save();
  
          return res.status(200).json({ success: true, COD: true });
        } else if (paymentMethod === 'razorpay') {
          const checkoutData = await checkOut.findOne({ userId: userId });
          const price = checkoutData.total;
  
          const options = {
            amount: price * 100, // amount in the smallest currency unit
            currency: "INR",
          };
  
          try {
            const razorpayOrder = await instance.orders.create(options);
            return res.status(200).json({ success: true, razorpayOrder });
          } catch (error) {
            console.error("Razorpay Order Creation Error: ", error);
            return res.status(500).json({ success: false, message: "Razorpay Order Creation Failed" });
          }
        } else {
          return res.status(400).json({ success: false, message: "Invalid payment method" });
        }
      } else {
        return res.redirect('/userLogin');
      }
    } catch (err) {
      console.error("Server Error: ", err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  
  },
  

  
  
  razorpayPost:async(req,res)=>{
    console.log('hi');
    const email = req.session.email;
    const user = await User.findOne({ email: email });
    const userId = user._id;
    const newAddress = req.session.paymentAddress
    

  },




  orderPlacedGet: async (req, res) => {
    if (req.session.email) {
      res.render("user/orderPlaced");
    }else{
      res.redirect('/userLogin')
    }
  },

  orderListGet: async (req, res) => {
    if (req.session.email) {
      const email = req.session.email;
      const user = await User.findOne({ email: email });
      const userId = user._id;
      const orderData = await orderSchema.find({ userId: userId }).populate('products.productId');
      console.log(orderData);
      res.render("user/orderList", { orderData });
    } else {
      res.redirect('/userLogin');
    }
  },
  
};



// checkmode


