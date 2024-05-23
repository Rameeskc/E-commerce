

const couponForm = document.getElementById("couponForm");
if(couponForm != null){

  couponForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const couponSelect = document.getElementById("couponSelect");
    const selectedCouponId = couponSelect.value;
    // console.log(selectedCouponId)
    
    try {
      const response = await axios.post("/applyCoupon", {
        couponId: selectedCouponId,
      });
      
      console.log(response.data);
      
    const couponDiscountElement = document.getElementById("cDPrice");
    couponDiscountElement.innerHTML = "-" + response.data.discount;
    
    const totalPrice = document.getElementById("tPrice");
    totalPrice.innerHTML = "₹" + response.data.discountedTotel;
    
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  }
});
}

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


const radio = document.querySelectorAll(".radio");
const selectedaddress = document.querySelector(".selectedaddress");
radio.forEach((element) => {
  element.addEventListener("change", () => {
    const data = element.value;
    selectedaddress.innerHTML = data;
    // console.log(data);
  });
});

var payment;
function paymentSelect(val) {
  payment = val;
  console.log(payment);
}


const proceedBtn = document.querySelector('.proceedBtn');
console.log(proceedBtn)
proceedBtn.addEventListener('click', async (event) => {
  
  event.preventDefault();
  if (!payment) {
    document.querySelector('.error').innerHTML = 'Please select a payment method';
    setTimeout(() => {
      document.querySelector('.error').innerHTML = '';
    }, 3000);
    return;
  }
  const paymentAddress = document.querySelector('.selectedaddress').innerHTML.trim().replace(/\s+/g, ' ');

  try {
    const response = await axios.post('/cartToCheckout', {
      paymentAddress: paymentAddress,
      paymentMethod: payment
    });
    const result = response.data;

    if (result.COD) {
      window.location.href = '/orderPlaced';
    } else if (result.razorpayOrder) {
      const options = {
        key: 'rzp_test_uGTXKwCq2SylhO', // Replace with your Razorpay key
        amount: result.razorpayOrder.amount,
        currency: result.razorpayOrder.currency,
        name: 'Your Company Name',
        description: 'Test Payment',
        order_id: result.razorpayOrder.id,
        handler: async function (response) {
          try {
            const orderResponse = await axios.post('/razorpay', response);
            const orderResult = orderResponse.data;
            if (orderResult.success) {
              window.location.href = '/orderPlaced';
            }
          } catch (error) {
            console.error("Error in Razorpay handler: ", error);
          }
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  } catch (error) {
    console.error(error);
  }
});




