async function addToCart(e,productId){
    e.preventDefault()

    try{
        const response = await axios.post(`/addToCart/${productId}`)

    }catch(err){
        console.log(err)
    }
}




async function removeCart(e, productId) {
    console.log(productId);
    try {
        e.preventDefault();
        const response = await axios.get(`/removeCart/${productId}`);

        const totalamtvalue = document.getElementById('sTotal');
        const discountAmount = document.getElementById('dPrice');
        const discountedAmount = document.getElementById('tPrice');

        const total = response.data.subtotal
        const totalDiscount = response.data.discount
        const totalDiscountedAmount = response.data.totalAmount

        console.log(total,totalDiscount,totalDiscountedAmount)
        totalamtvalue.innerHTML=`₹${total}`;
        discountAmount.innerHTML =`-${totalDiscount}`;
        discountedAmount.innerHTML = `₹${totalDiscountedAmount}`;


        if (response.data.message == "ok") {
            document.querySelector(`.items.position-relative${productId}`).remove();
            console.log('hjghghg');
        }
    } catch (err) {
        console.log(err);
    }
}


async function inc(e, productId ) {
    try {
        e.preventDefault();
        const value = document.querySelector(`.qtyOne${productId}`);
        let qty = parseInt(value.innerHTML);
        // Increment the quantity
        qty++;

        // Update the quantity display
        value.innerHTML = qty;

        const response = await axios.post(`/cartInc?productId=${productId}`, {
            quantity: qty 
        });
    
        const totalamtvalue = document.getElementById('sTotal');
        const discountAmount = document.getElementById('dPrice');
        const discountedAmount = document.getElementById('tPrice');

        const total = response.data.subtotal
        const totalDiscount = response.data.discount
        const totalDiscountedAmount = response.data.totalAmount

        console.log(total,totalDiscount,totalDiscountedAmount)
        totalamtvalue.innerHTML=`₹${total}`;
        discountAmount.innerHTML =`-${totalDiscount}`;
        discountedAmount.innerHTML = `₹${totalDiscountedAmount}`;


        // Send the updated quantity to the server
        

    } catch (err) {
        console.log(err);
    }
}


async function dec(e, productId){
    try {
        e.preventDefault();
        const value = document.querySelector(`.qtyOne${productId}`);
        let qty = parseInt(value.innerHTML);
    let totalamts = 0
        // Check if qty is already 1
        if (qty > 1) {
            qty--;
            console.log('qty:',qty);
            // Update the quantity display

            value.innerHTML = qty
          
            // Send the updated quantity to the server
            const response = await axios.post(`/cartInc?productId=${productId}`, {
                quantity: qty
            });
            const totalamtvalue = document.getElementById('sTotal');
        const discountAmount = document.getElementById('dPrice');
        const discountedAmount = document.getElementById('tPrice');

        const total = response.data.subtotal
        const totalDiscount = response.data.discount
        const totalDiscountedAmount = response.data.totalAmount

        console.log(total,totalDiscount,totalDiscountedAmount)
        totalamtvalue.innerHTML=`₹${total}`;
        discountAmount.innerHTML =`-${totalDiscount}`;
        discountedAmount.innerHTML = `₹${totalDiscountedAmount}`;
        }
    } catch (err) {
        console.log(err);
    }
}