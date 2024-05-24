const { log } = require("console");
const { User } = require("../model/signup");
const profileSchema = require("../model/profile");

module.exports = {

   userprofileGet : async (req, res) => {
    if (req.session.email) {
      try {
        const email = req.session.email;
        const user = await User.findOne({ email: email });
  
        if (user) {
          const userId = user._id;
          const profileData = await profileSchema.findOne({ userId: userId });
  
          if (profileData && profileData.address.length > 0) {
            const firstAddress = profileData.address[0];
            console.log(firstAddress);
  
            // Assuming you want to pass the first address to the view
            res.render("user/userProfile", { firstAddress });
          } else {
            console.log('No address found for the user.');
            res.render("user/userProfile", { address: null });
          }
        } else {
          console.log('User not found.');
          res.redirect('/userLogin');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        res.redirect('/userLogin');
      }
    } else {
      res.redirect('/userLogin');
    }
  },
  
  // Call the function with the user ID for testing
  // userprofileGet({ session: { email: 'test@example.com' } }, res);
  

  userprofilelistGet: async (req, res) => {
    if (req.session.email) {
      try {
        const user = await User.findOne({ email: req.session.email });
        const userprofile = await profileSchema.findOne({ userId: user._id });
        const profileData = userprofile?.address;
        res.render("user/userprofileList", { profileData });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/userLogin");
    }
  },

  addprofileGet: (req, res) => {
    res.render("user/addProfile");
  },

  addprofilePost: async (req, res) => {
    if (req.session.email) {
      const {
        name,
        locality,
        country,
        district,
        state,
        city,
        hNo,
        pin,
        Phone,
      } = req.body;
      const email = req.session.email;
      const user = await User.findOne({ email: email });
      const userId = user._id;
      const userprofile = await profileSchema.findOne({ userId: userId });

      try {
        if (!userprofile) {
          await profileSchema.create({
            userId: userId,
            address: {
              Name: name,
              Locality: locality,
              Country: country,
              District: district,
              State: state,
              City: city,
              HouseNo: hNo,
              pinCode: pin,
              Phone: Phone,
            },
          });
        } else {
          await profileSchema.updateOne(
            { userId: userId },
            {
              $push: {
                address: {
                  Name: name,
                  Locality: locality,
                  Country: country,
                  District: district,
                  State: state,
                  City: city,
                  HouseNo: hNo,
                  pinCode: pin,
                  Phone: Phone,
                },
              },
            }
          );
        }
      } catch (error) {
        // Handle errors
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      res.redirect("/userprofileList");
    } else {
      res.redirect("/userLogin");
    }
  },

  deleteProfileGet: async (req, res) => {
    if (req.session.email) {
      const id = req.params.id;

      const email = req.session.email;
      const user = await User.findOne({ email: email });
      const userId = user._id;
      await profileSchema.updateOne(
        { userId: userId },
        { $pull: { address: { _id: id } } }
      );

      res.status(200).send({message:"ok"})

      res.render("user/userprofileList");
    } else {
      res.redirect("/userLogin");
    }
  },

  
};
