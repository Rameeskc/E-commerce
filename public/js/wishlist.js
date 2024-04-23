const heartIcon = document.querySelector('.hai');
async function wishList(e, productId) {
    try {
        e.preventDefault();
        const response = await axios.post(`/wishlist?id=${productId}`);
        if (response.status === 200) {
            if (heartIcon.style.color === 'rgb(141, 130, 130)') {
                heartIcon.style.color = '#ff0000'; 
            } else {
                heartIcon.style.color = '#8d8282';
            }
        } else {
            window.location.href = '/userLogin';
        }
    } catch (err) {
        console.log(err);
    }
}
