"use client";

import Image from "next/image";
import Link from "next/link";

function VendorPublishedProductCard({
  product_url,
  label,
  shortDesc,
  created_at,
  buying_price,
  selling_price,
  status,
  id,
  topSelling
}: any) {

  const formattedDate = new Date(created_at).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <div className="bg-white border rounded-2xl overflow-hidden 
    shadow-sm hover:shadow-xl transition-all duration-300 
    flex flex-col group relative w-90">

      {/* IMAGE */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={product_url}
          alt="product"
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

        {topSelling && (
          <span className="absolute top-3 left-3 
          bg-green-600 text-white text-xs 
          px-3 py-1 rounded-full shadow">
            Top Selling
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-2 flex-1">

        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {label}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2">
          {shortDesc}
        </p>

        <p className="text-xs text-gray-400">
          Created: {formattedDate}
        </p>

        {/* PRICE */}
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">
            Buy: <b>₹{buying_price}</b>
          </span>

          <span className="text-blue-600 font-semibold">
            Sell: ₹{selling_price}
          </span>
        </div>

        {/* STATUS */}
        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "Published"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {status}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/dashboard/product/edit/${id}`}
            className="flex-1 text-center bg-blue-600 
            hover:bg-blue-700 text-white py-2 
            rounded-md text-sm transition"
          >
            Edit
          </Link>

          <button
            className="flex-1 bg-red-500 hover:bg-red-600 
            text-white py-2 rounded-md text-sm transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default VendorPublishedProductCard;