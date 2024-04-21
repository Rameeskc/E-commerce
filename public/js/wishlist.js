
async function wishList(e, productId) {
    try {
        e.preventDefault();
        const response = await axios.post(`/wishlist?id=${productId}`);
        if (response.status === 200) {
            // console.log("Added to Wishlist");
        }else{
            // console.log("Something went wrong")
          window.location.href='/userLogin'
        }
    } catch (err) {
        console.log(err);
    }
}
