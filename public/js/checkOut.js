
async function addToCheckout(e,productId){
    e.preventDefault()
    try{
        const response = await axios.post('/buyToCheckout/${productId}')
    }catch(err){
        console.log(err);
    }
}