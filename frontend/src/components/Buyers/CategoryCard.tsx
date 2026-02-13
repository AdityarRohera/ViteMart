'use client'

import Image from "next/image";

function CategoryCard({ icon, categoryName }: any) {
  return (
    <div className="flex flex-col items-center gap-3 
      p-5 bg-white rounded-xl shadow-md 
      hover:shadow-xl hover:scale-105 
      transition cursor-pointer border border-gray-100 w-70">

      <Image
        src={icon}
        alt={categoryName}
        width={60}
        height={60}
      />

      <h3 className="font-semibold text-gray-700">
        {categoryName}
      </h3>
    </div>
  );
}

export default CategoryCard;

