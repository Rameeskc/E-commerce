const { log } = require('console')
const profileSchema = require('../model/profile')

module.exports={
    userprofilelistGet: async (req, res) => {
        if(req.session.email){
            try{
                const profileData = await profileSchema.find()
                res.render('user/userprofileList', { profileData })
            }catch(err){
                console.log(err);
            }
        }else{
            res.redirect('/userLogin')
        }
    },
    
    addprofileGet: (req, res) => {
        res.render('user/addProfile')
    },
    
    addprofilePost: async (req, res) => {

    if(req.session.email){
        const { name, locality, country, district, state, city, hNo, pin, Phone } = req.body
        try {
            await profileSchema.create({
                Name: name,
                Locality: locality,
                Country: country,
                District: district,
                State: state,
                City: city,
                HouseNo: hNo,
                pinCode: pin,
                Phone: Phone
            })
        } catch (error) {
            // Handle errors
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        res.redirect('/userprofileList')
    
    }else{
        res.redirect('/userLogin')
    }
        
    },
    
    editprofileGet: async(req, res) => {
        if(req.session.email){
            try{
                const id =req.params.id
                const profileData = await profileSchema.findById(id)
                res.render('user/editProfile',{profileData})
            }catch(err){
                console.log(err);
            }


        }else{
            res.redirect('/userLogin')
        }
    },
    editprofilePost:async(req,res)=>{
        if(req.session.email){
            try{
                const id = req.params.id
                const{name,locality,country,district,state,city,hNo,pin,phone}= req.body
                const editProfile = await profileSchema.findByIdAndUpdate(
                    {_id:id},
                    {
                        Name:name,
                        Locality:locality,
                        Country:country,
                        District:district,
                        State:state,
                        City:city,
                        HouseNo:hNo,
                        pinCode:pin,
                        Phone:phone,
                    },
                    {new:true}
                )
                res.redirect('/userprofileList')

            }catch(err){
                console.log(err);
            }
        }else{
            res.redirect('/userLogin')
        }
    },

    deleteProfileGet:async(req,res)=>{
        if(req.session.email){
            const id = req.params.id
            const remove = await profileSchema.findByIdAndDelete(id)
            res.redirect('/userprofileList')
        }else{
            res.redirect('/userLogin')
        }
    },

    userprofileGet: (req, res) => {
        res.render('user/userProfile')
    },
}

