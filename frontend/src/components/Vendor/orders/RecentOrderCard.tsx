"use client";

import Image from "next/image";

function RecentOrderCard({
  orderId,
  productName,
  productImage,
  date,
  customer,
  price,
  status,
}: any) {
  const statusStyle: any = {
    Processing: "bg-orange-100 text-orange-600",
    Shipped: "bg-green-100 text-green-600",
    Delivered: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-75 flex flex-col gap-3 hover:shadow-lg transition">
      {/* Order ID */}
      <div className="flex justify-between text-gray-500 text-sm">
        <span>#{orderId}</span>
        <span>♡</span>
      </div>

      {/* Product Name */}
      <h2 className="text-lg font-semibold">{productName}</h2>

      {/* Product Image */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden">
        <Image
          src={productImage}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>

      {/* Order Info */}
      <div className="text-sm text-gray-600">
        <p>{date}</p>
        <div className="flex justify-between mt-1">
          <span>{customer}</span>
          <span className="font-semibold text-gray-800">${price}</span>
        </div>
      </div>

      {/* Order Status */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Order Total</p>
          <p className="font-semibold">${price}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            statusStyle[status]
          }`}
        >
          {status}
        </span>
      </div>

      {/* Action Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2 transition">
        View Order
      </button>
    </div>
  );
}

export default RecentOrderCard;
