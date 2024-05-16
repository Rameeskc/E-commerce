

const couponForm = document.getElementById('couponForm');

couponForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const couponSelect = document.getElementById('couponSelect');
    const selectedCouponId = couponSelect.value;
    // console.log(selectedCouponId)

    try {
        const response = await axios.post('/applyCoupon', { couponId: selectedCouponId });

        console.log(response.data);

        const couponDiscountElement = document.getElementById('cDPrice');
        couponDiscountElement.innerHTML = "-"+response.data.discount;

        const totalPrice = document.getElementById('tPrice');
        totalPrice.innerHTML = '₹'+response.data.discountedTotel

        console.log(response.data);

    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
});

// async function changeAddress(e,addressId,elementId) {
//     console.log(addressId);
//     try{
//         e.preventDefault()
//         const response = await axios.post(`/addressChange/${addressId}`)

//         console.log(response)
//         const name = document.querySelector('.name')
//         const address = document.querySelector('.address')
//         const phone = document.querySelector('.phone')


//     }catch(err){
//         console.log(err);
//     }
// }


const radio = document.querySelectorAll('.radio');
const selectedaddress =document.querySelector('.selectedaddress')
radio.forEach((element) => {
  element.addEventListener('change', () => {
    const data = element.value;
    selectedaddress.innerHTML=data;
  })
}); 







