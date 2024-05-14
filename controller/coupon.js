const couponSchema=require('../model/coupon')


module.exports={
    couponGet:async(req,res)=>{
        const couponData = await couponSchema.find()
        res.render('admin/adminCoupon',{couponData})
    },


    addcouponGet:(req,res)=>{
        res.render('admin/addCoupon')
    },

    addcouponPost:async(req,res)=>{
        const{code,date,discountAmount,above,below}=req.body
        try{
            await couponSchema.create({
                couponText:code,
                date:date,
                discount:discountAmount,
                above:above,
                below:below
            })
            res.redirect('/adminCoupon')
        }catch(err){
            console.log(err);
        }
        
    },

    editCouponGet:async(req,res)=>{
        try{
            const couponId = req.params.id
            const couponData = await couponSchema.findById(couponId)
            res.render('admin/editCoupon',{couponData})
        }catch(err){
            console.log(err);
        }
    
    },

    editCouponPost:async(req,res)=>{
        try{
            const id = req.params.id
            const{code,date,discountAmount,condition}=req.body
            const updateDate = await couponSchema.findByIdAndUpdate(
                {_id:id},
                {
                    couponText:code,
                    date:date,
                    discount:discountAmount,
                    above:above,
                    below:below
                },
                {new:true}
            )

            res.redirect('/adminCoupon')
        }catch(err){
            console.log(err);
        }
    },
    deleteCouponGet:async(req,res)=>{
        try{
            const id = req.params.id
            const deleteCoupon = await couponSchema.findByIdAndDelete(id)
            res.redirect('/adminCoupon')
        }catch(err){
            console.log(err)
        }
        
    }
}
