import { createOrder } from '@/services/operations/buyer/payments';
import React, { useState } from 'react'
import Script from "next/script";
import { useUser } from '@/context/UserProvider';

function RazorpayPayment({loadCarts , orderSummary} : any) {

  const [loading, setLoading] = useState(false);

  const user = (useUser()).user;
  console.log(user);

  if (!orderSummary) {
    return (
      <div>
        <button
          disabled
          className="w-full mt-6 bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
        >
          Loading Order...
        </button>
      </div>
    );
  }

    const {order_id , total_amount , total_products} = orderSummary;

    const paymentHandler = async() => {      
      try{
          setLoading(true)
          const order = await createOrder({amount : total_amount , currency : 'INR' , order_id});

          console.log(order)
          console.log("Key id" ,  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)

           // 2️⃣ Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // store in env
        amount: order.amount, // amount in paise
        currency: order.currency,
        name: "VibeMart",
        description: "Order Payment",
        order_id: order.id,

        handler: function (response: any) {
          alert("Payment Successful!");
          loadCarts();
          console.log(response);
        },

        prefill: {
          name: `${user.name}`,
          email: `${user.email}`,
          contact: "9999999999"
        },

        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      } catch(err){
        console.log("Error comes in payment -> " , err)
      } finally{
        setLoading(false)
      }
    }

  return (
    <div>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <button onClick={paymentHandler} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  )
}

export default RazorpayPayment
