'use client'

import Image from "next/image";
import Link from "next/link";

function CategoryCard({ name , category_url , id }: any) {
  // console.log(`${name}_${id}`)
  return (
    <Link href={`shop/category/${name}_${id}`}>
    <div className="
      relative w-64 h-40 
      rounded-xl overflow-hidden 
      shadow-md hover:shadow-2xl 
      hover:scale-105 
      transition duration-300 
      cursor-pointer group
    ">

      {/* Background Image */}
      <Image
        src={category_url}
        alt={name}
        fill
        className="object-cover group-hover:scale-110 transition duration-500"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>

      {/* Category Name */}
      <div className="absolute bottom-3 left-3">
        <h3 className="text-white text-lg font-semibold tracking-wide">
          {name}
        </h3>
      </div>

    </div>
    </Link>
  );
}

export default CategoryCard;

