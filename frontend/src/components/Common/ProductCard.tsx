
'use client'

import Image from "next/image";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  rating,
  reviews,
}: ProductCardProps) {
  return (
    <div className="w-80 bg-white rounded-2xl shadow-md p-4 
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* Image + Wishlist */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={250}
          height={200}
          className="object-cover h-52 w-full hover:scale-105 transition"
        />

        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50">
          <Heart size={18} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-gray-700 font-medium mt-3 line-clamp-2 text-sm">
        {title}
      </h2>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-lg font-semibold">₹{price}</span>

        {originalPrice && (
          <span className="line-through text-gray-400 text-sm">
            ₹{originalPrice}
          </span>
        )}
      </div>

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
            {rating} <Star size={12} />
          </span>
          <span className="text-gray-500">{reviews} reviews</span>
        </div>
      )}

      {/* Add to cart */}
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg 
        hover:bg-blue-700 font-medium transition">
        Add to Cart
      </button>
    </div>
  );
}
