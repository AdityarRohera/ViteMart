"use client";

import CartButton from "@/components/Common/CartButton";
import { DecreaseCartQuantity, getAllOrderItems, IncreaseCartQuantity } from "@/services/operations/buyer/orderAndCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RazorpayPayment from "@/components/Buyers/order/RazorpayPayment";

export default function CartPage() {

  const [cartData , setCartData] = useState<any>([]);
  const [orderSummary , setOrderSummary] = useState<any>(null);
  const router = useRouter();

  console.log(cartData);
  console.log("Ordersummary -> " , orderSummary)

 const subtotal = orderSummary ? parseInt(orderSummary.total_amount) : 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const loadCarts = async () => {
    const res = await getAllOrderItems();
    const { items, ...orderSummary } = res;

    setCartData(items);
    setOrderSummary(orderSummary);
  };


    const increase = async (orderItemID : string) => {
      await IncreaseCartQuantity({
        quantity: 1,
        orderItem_id: orderItemID,
        status: "Increase"
      });

      loadCarts();
    };
  
    const decrease = async (orderItemID : string) => {
      const response = await DecreaseCartQuantity({
        quantity: 1,
        orderItem_id: orderItemID,
        status: "Decrease"
      });
  
      console.log(response);
  
      loadCarts();
    };


  useEffect(() => {
    loadCarts();
  } , [])


  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-10">
          <p className="text-gray-600 text-2xl font-medium opacity-80 mb-6">Items in {cartData.length} Cart</p>

          {
            cartData.length === 0 && 
            <div className="w-full min-h-50 border border-gray-50 shadow flex justify-center items-center text-3xl font-medium opacity-60 mb-6">
              Products Not Added Yet 😞
            </div>
          }

          {cartData.map((item : any) => (
            <div
              key={item.order_item_id}
              className="flex justify-between items-center mb-6 border p-4 hover:scale-101 transition-all duration-300 hover:shadow-2xl rounded-2xl shadow"
            >
              <div className="flex gap-10">
                <Image
                  src={item.product_url}
                  alt={item.label}
                  width={150}
                  height={150}
                  
                  className="rounded-lg object-cover border"
                />

                <div>
                  <h2 className="font-semibold text-lg">{item.label}</h2>
                  <p className="text-gray-500 text-sm mb-2">{item.seller_name}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button onClick={() => decrease(item.order_item_id)} className="px-3 py-1 border rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => {increase(item.order_item_id)}} className="px-3 py-1 border rounded">+</button>
                  </div>

                  {/* <CartButton cart={true} quantity={item.quantity} increase={increase} decrease={decrease} /> */}

                  <p className="mt-2 font-medium">
                    Total: ₹{item.selling_price * item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">₹{item.selling_price * item.quantity}</p>
                <p className="line-through text-gray-400 text-sm">
                  ₹{item.selling_price*1.1}
                </p>
                <button className="text-blue-600 text-sm mt-2">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button className="text-blue-600 font-medium">
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          
          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Delivery Address
            </h2>

            <div className="border-2 border-dashed p-6 rounded-lg text-center">
              <p className="text-blue-600 font-medium mb-2">
                Add a delivery address
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Please add your address for the delivery.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                + Add Address
              </button>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{orderSummary ? orderSummary.total_amount : 0}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total Order Items:</span>
              <span>{orderSummary ? orderSummary.total_products : 0}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping Cost:</span>
              <span>₹{shipping}</span>
            </div>


            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total Amount:</span>
              <span>₹{total}</span>
            </div>

            {/* <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button> */}

            <RazorpayPayment loadCarts={loadCarts}  orderSummary={orderSummary} />
          </div>
        </div>
      </div>
    </div>
  );
}
