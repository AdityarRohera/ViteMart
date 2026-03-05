"use client";

import Image from "next/image";
import Link from "next/link";

function VendorPublishedProduct({
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

    console.log(formattedDate);

  return (
    <div className="bg-white border rounded-xl p-7 
    flex items-center justify-between 
    hover:shadow-md transition shadow relative h-50">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6 flex-1">

        {/* Bigger Image */}
        <div className="relative w-36 h-28 rounded-lg overflow-hidden border">
          <Image
            src={product_url}
            alt={"product"}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {label}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-2">
            {shortDesc}
          </p>

          <p className="text-sm text-gray-400">
            Created: {formattedDate} 
          </p>

          <div className="flex gap-6 text-sm mt-1">
            <span>
              Buying: <b>Rs {buying_price}</b>
            </span>
            <span>
              Selling: <b>Rs {selling_price}</b>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Status Badge */}
        <span
          className={`px-4 py-1 rounded-md text-sm font-medium ${
            status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {status}
        </span>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link href={`/dashboard/product/edit/${id}`} onClick={(e) => e.stopPropagation()} className="bg-blue-600 hover:bg-blue-700 
          text-white px-5 py-2 rounded-md transition">
            Edit
          </Link>

          <Link href={'/dashboard/product'} onClick={(e) => e.stopPropagation()} className="bg-red-500 hover:bg-red-600 
          text-white px-5 py-2 rounded-md transition">
            Delete
          </Link>
        </div>
      </div>


      {
        topSelling && <div className="border border-green-100 shadow px-3 text-md font-medium rounded-2xl bg-green-600 text-white absolute top-2">Top Selling</div>
      }
    </div>
  );
}

export default VendorPublishedProduct;

