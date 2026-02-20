'use client'

import { singleShopProduct } from "@/services/operations/buyer/products";
import React, { useEffect, useState } from "react";
import {use} from 'react'
import Image from "next/image";

function Page({params} : {params : Promise<{productId : string}>}) {

  const {productId} = use(params);
  const [data , setData] = useState<any>(null);
  const [loading , setLoading] = useState(true)
  console.log(data);

  useEffect(() => {
    const loadProduct = async() => {
      const product  = await singleShopProduct(productId);
      setData(product);
      setLoading(false);
    }

    loadProduct();
  } , [])

  if(loading) return <div>Loading...</div>
  if(!data) return <div>Something Wrong</div>


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-[90%] mx-auto bg-white rounded-2xl shadow-lg p-6 flex gap-20 ">

        {/* Product Image */}
        <div className="overflow-hidden rounded-xl w-[30%]">
          <Image
            src={data.product_url}// replace with your image
            width={200}
            height={100}
            className="w-full h-105 cursor-pointer object-cover
              transition-transform duration-500
              hover:scale-110"
              alt="Product"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-3 justify-center w-[70%]">
          <h1 className="text-3xl font-semibold mb-2">
            {data.label}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-black">{data.selling_price}</span>
            <span className="line-through text-gray-400">{data.selling_price*1.1}</span>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg">
              4.1 ★
            </span>
            <span className="ml-2 text-gray-500">
              13737 reviews
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {data.description}
          </p>

          {/* Size Options */}
          <div className="flex gap-3 mb-6">
            {["M", "L", "XL"].map(size => (
              <button
                key={size}
                className="border px-5 py-2 rounded-lg
                hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-orange-400 hover:bg-orange-500
              text-white px-8 py-3 rounded-xl text-lg">
              Buy Now
            </button>

            <button className="bg-blue-600 hover:bg-blue-700
              text-white px-8 py-3 rounded-xl text-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
