'use client'

import Image from "next/image";
import { TrendingUp, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopSellingProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  totalSold: number;
  totalRevenue: number;
}

export default function TopSellingProductCard({
  id,
  image,
  title,
  price,
  totalSold,
  totalRevenue,
}: TopSellingProductCardProps) {

  const router = useRouter();

  return (
    <div className="w-80 bg-white rounded-2xl shadow-md p-4 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={250}
          height={200}
          className="object-cover h-48 w-full"
        />

        {/* Top badge */}
        <div className="absolute top-2 left-2 bg-green-600 text-white 
            text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={14} />
          Top Seller
        </div>
      </div>

      {/* Title */}
      <h2 className="text-gray-800 font-semibold mt-3 line-clamp-2">
        {title}
      </h2>

      {/* Price */}
      <p className="text-gray-600 mt-1">
        Price: <span className="font-medium">₹{price}</span>
      </p>

      {/* Sales Info */}
      <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Total Sold</span>
          <span className="font-semibold">{totalSold}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-gray-500">Revenue</span>
          <span className="font-semibold text-green-600">
            ₹{totalRevenue}
          </span>
        </div>
      </div>

      {/* View Button */}
      <button
        onClick={() => router.push(`/dashboard/product/${id}`)}
        className="w-full mt-4 flex items-center justify-center gap-2 
        bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Eye size={16} />
        View Full Product
      </button>
    </div>
  );
}