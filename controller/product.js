const productSchema=require("../model/product")

module.exports={

productGet:async(req,res)=>{
    const products = await productSchema.find()
    res.render('admin/adminProduct',{products})
},

addproductGet:(req,res)=>{
    res.render('admin/addProduct')
},

addproductPost:async(req,res)=>{
const productImage = req.files.map((img) => img.filename);
const {productPrice,productDiscount} = req.body
const discounted =productPrice*productDiscount/100;
const discountedValue=productPrice-discounted
const roundedValue = Math.round(discountedValue)  

try {
  await productSchema.create({ ...req.body, productImage: productImage, productDiscounted:roundedValue ,productDiscountedAmount:discounted});
  res.redirect('/adminProduct')
} catch (err) {
  console.error(err);
  res.status(500).send("Error adding product");
}
},

editproductGet:async(req,res)=>{
    // const productId = req.params.id;
    const {id} = req.params
    const productData=await productSchema.findById(id);
    // console.log(productData)

    res.render('admin/editProduct',{productData})
},

editproductPost:async(req,res)=>{
    const productImage = req.files.map((img) => img.filename);
    const { id } = req.params;

    const {productPrice,productDiscount} = req.body
    const discounted =productPrice*productDiscount/100;
    const discountedValue=productPrice-discounted
    const roundedValue = Math.round(discountedValue)    

    const newData = { ...req.body , productDiscounted:roundedValue, productDiscountedAmount:discounted}
    if(productImage.length){
        newData['productImage'] = productImage
    }
    try{
        const document = await productSchema.findById(id);

    if (!document) {
        // If document not found, return 404 Not Found
        return res.status(404).json({ error: 'Document not found' });
    }

    // Update the document with the new data
    // You can update specific fields or replace the entire document
    document.set(newData);

    // Save the updated document back to the database
    await document.save();
    res.redirect("/adminProduct")
    }catch (error) {
        // Handle errors
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},

deleteproductGet:async(req,res)=>{
    const {id} = req.params
    await productSchema.findByIdAndDelete(id);
    res.redirect("/adminProduct")
}, 
}