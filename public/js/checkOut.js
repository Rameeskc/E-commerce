

const couponForm = document.getElementById('couponForm');

couponForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const couponSelect = document.getElementById('couponSelect');
    const selectedCouponId = couponSelect.value;
    console.log(selectedCouponId)

    try {
        const response = await axios.post('/applyCoupon', { couponId: selectedCouponId });

        console.log(response.data);

        const couponDiscountElement = document.getElementById('cDPrice');
        couponDiscountElement.innerHTML = response.data.discount;

        const totalPrice = document.getElementById('tPrice');
        totalPrice.innerHTML = response.data.discountedTotel

        console.log(response.data);

    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
});

async function changeAddress(e,addressId) {
    console.log(addressId);
    try{
        e.preventDefault()
        const response = await axios.post(`/addressChange/${addressId}`)
    }catch(err){
        console.log(err);
    }
}


// const radio = document.querySelectorAll('.radio');

// radio.forEach((element) => {
//   element.addEventListener('change', () => {
//     const data = element.value;
//     console.log('helllo');
//   })
// }); 







