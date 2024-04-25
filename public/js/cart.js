const { response } = require("express");

async function addToCart(e,productId){
    e.preventDefault()

    try{
        const response = await axios.post(`/addToCart/${productId}`)

    }catch(err){
        console.log(err)
    }
}


async function removeCart(e,productId){
   try{
    e.preventDefault()
    const response = await axios.get(`/removeCart/${productId}`)

   }catch(err){
    
    console.log(err);
}
}