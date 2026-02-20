"use client";

import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const [cart] = useState([
    {
      id: 1,
      name: "Trendy Glamorous Men Shirt",
      seller: "H&M Seller",
      price: 245,
      oldPrice: 271,
      image: "/shirt1.jpg",
      qty: 1,
    },
    {
      id: 2,
      name: "Classy Elegant Men Tshirts",
      seller: "GadgetZone Seller",
      price: 162,
      oldPrice: 179,
      image: "/shirt2.jpg",
      qty: 1,
    },
  ]);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shipping = 40;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-10">
          <p className="text-gray-600 mb-6">Items in {cart.length} Cart</p>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-6 mb-6"
            >
              <div className="flex gap-10">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover border"
                />

                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500 text-sm">{item.seller}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button className="px-3 py-1 border rounded">-</button>
                    <span>{item.qty}</span>
                    <button className="px-3 py-1 border rounded">+</button>
                  </div>

                  <p className="mt-2 font-medium">
                    Total: ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">₹{item.price}</p>
                <p className="line-through text-gray-400 text-sm">
                  ₹{item.oldPrice}
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
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping Cost:</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total Amount:</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
