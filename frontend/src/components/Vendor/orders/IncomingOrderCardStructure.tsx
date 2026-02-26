'use client'

import { getIncomingOrders, updateOrderStatus } from "@/services/operations/vendor/orders";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderCardStructure({order} : any) {
  console.log(order)

const {order_id , total_order_price , buyer_id , name , email , created_at , items , status} = order;

// Convert backend status to UI format
const formatStatus = (s: string) =>
  s === 'paid' ? 'PENDING' : s.toUpperCase();

const [selectedStatus , setSelectedStatus] = useState(formatStatus(status));
const [loading, setLoading] = useState(false);

const router = useRouter();
console.log(selectedStatus);


const changeHandler = (e: any) => {
  setSelectedStatus(e.target.value);
};

const updateHandler = async () => {
  try {
    setLoading(true);

    const backendStatus =
      selectedStatus === 'PENDING'
        ? 'paid'
        : selectedStatus.toLowerCase();

    await updateOrderStatus(backendStatus, order_id);

    setLoading(false);
  } catch (err) {
    console.log("Update error", err);
    setLoading(false);
  }
};


return (
  <div className="bg-white rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300 p-6 w-110 max-w-3xl mx-auto border-">

    {/* Header */}
    <div className="flex justify-between items-start">

      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Order #{order_id.slice(0, 8)}
        </h2>

        <p className="text-sm text-gray-600 mt-1">{name}</p>

        <p className="text-sm text-gray-400">
          789 Pine Street, Los Angeles
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {new Date(created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">

        {/* Dynamic Status Badge */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium
          ${
            selectedStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : selectedStatus === "SHIPPED"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {selectedStatus}
        </span>

        <Link
          href={`/dashboard/orders/${order_id}`}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
        >
          View Order
        </Link>
      </div>
    </div>

    {/* Product Preview Section */}
    <div className="flex items-center justify-between mt-6 pt-4 border-t">

      <div className="flex items-center">
        {items.slice(0, 3).map((item: any, index: number) => (
          <div
            key={item.product_id}
            className={`w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow -ml-3 ${
              index === 0 ? "ml-0" : ""
            }`}
          >
            <Image
              src={item.image}
              alt="product"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
        ))}

        {items.length > 3 && (
          <span className="ml-3 text-sm text-gray-500">
            +{items.length - 3} more
          </span>
        )}
      </div>

      <p className="font-semibold text-gray-800 text-lg">
        ${total_order_price}
      </p>
    </div>

    {/* Status Update Section */}
    <div className="flex justify-end items-center gap-3 mt-5">

      <select
        onChange={changeHandler}
        value={selectedStatus}
        className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        <option>PENDING</option>
        <option>SHIPPED</option>
        <option>DELIVERED</option>
      </select>

      <button
        onClick={updateHandler}
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  </div>
);

}