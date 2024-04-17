const bannerSchema = require('../model/banner')

module.exports = {
    bannerGet: async (req, res) => {
        const bannersData = await bannerSchema.find()
        // console.log(banners);
        res.render('admin/adminBanner', { bannersData })
    },

    addbannerGet: (req, res) => {
        res.render('admin/addBanner')
    },

    addbannerPost: async (req, res) => {
        const bannerImage = req.file?.filename;
        const { bannerText } = req.body
        // console.log(bannerText)
        try {
            await bannerSchema.create({ bannerText: bannerText, bannerImage: bannerImage })
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding product");
        }
        res.redirect('/adminBanner')
    },

    editbannerGet: async (req, res) => {
        const id = req.params.id
        bannerData = await bannerSchema.findById(id)
        res.render('admin/editBanner', { bannerData })
    },

    editbannerPost: async (req, res) => {
        const id = req.params.id
        const bannerImage = req.file?.filename
        const { bannerText } = req.body
        const updatedData = await bannerSchema.findByIdAndUpdate({ _id:id }, { bannerText: bannerText, bannerImage: bannerImage }, { new: true })
        // console.log(updatedData)
        res.redirect('/adminBanner')
    },

    deletebannerGet:async(req,res)=>{
        const id= req.params.id;
        await bannerSchema.findByIdAndDelete(id)
        res.redirect('/adminBanner')
    }

}