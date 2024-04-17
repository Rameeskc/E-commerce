const categorySchema = require('../model/category')



module.exports = {
    categoriesGet: async (req, res) => {
        categories = await categorySchema.find()
        res.render('admin/adminCategories', { categories })
    },

    categoriesPost: (req, res) => {

    },

    addcategoriesGet: (req, res) => {

        res.render('admin/addCategories')
    },

    addcategoriesPost: async (req, res) => {

        const { categoryName, subcategoryName } = req.body
        const categoryImage = req.file.filename;

        // console.log(req.file);
        const subcategoryArray = subcategoryName.split(',')
        // console.log(subcategoryArray)
        try {
            await categorySchema.create({
                categoryName: categoryName,
                subcategoryName: subcategoryArray,
                categoryImage: categoryImage,

            })
            res.redirect('/adminCategories')
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding category");
        }
    },
    editcategoriesGet: async (req, res) => {
        //  console.log(req.params)
        const { id } = req.params
        const categoryData = await categorySchema.findById(id)
        // console.log(categoryData);
        res.render('admin/editCategories', { categoryData })
    },
    editcategoriesPost: async (req, res) => {

        const { id } = req.params;
        let categoryImage;
        const array = req.body.subcategoryName.split(',')
        const categoryData = await categorySchema.findOne({ _id: id })

        if (!req.file) {
            categoryImage = categoryData.categoryImage
        } else {
            categoryImage = req.file.filename;
        }
        try {
            const document = await categorySchema.updateOne({ _id: id }, {
                $set: {
                    categoryName: req.body.categoryName,
                    subcategoryName: array,
                    categoryImage:categoryImage
                }
            })
            if (!document) {
                // If document not found, return 404 Not Found
                return res.status(404).json({ error: 'Document not found' });
            }
            res.redirect('/adminCategories')
        } catch (error) {
            // Handle errors
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    },
    deletecategoriesPost:async(req,res)=>{
        const {id} = req.params
        await categorySchema.findByIdAndDelete(id);
        res.redirect("/adminCategories")
    }

}
