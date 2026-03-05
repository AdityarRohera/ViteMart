'use client'
import { viewFullProduct } from "@/services/operations/vendor/productAndInventory";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Link from "next/link";

function page({params} : {params : Promise<{productId : string}>}) {

    const {productId} = use(params);
    console.log("Getting product_id in manage inventory -> " , productId);

    const [product , setProduct] = useState<any>(null);
    const [loading , setLoading] = useState(true)
    console.log(product)

    useEffect(() => {
        const loadProduct = async() => {
            const res = await viewFullProduct(productId);
            setProduct(res);
            setLoading(false)
        }

        loadProduct();
    } , [])

    if(loading){
        return <div>Loading...</div>
    }

    if(!product){
        return <div className="flex justify-center items-center text-4xl mt-50">Not Found</div>
    }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm">View Product</p>
        <h1 className="text-3xl font-semibold text-gray-800 mt-2">
          {product.label}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {product.created_at}
        </p>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT: Product Image Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">

          <div className="relative w-[320px] h-105 rounded-2xl overflow-hidden border">
    <Image
      src={product.image}
      alt="product image"
      fill
      className="object-cover hover:scale-110 transition-transform duration-300"
    />
  </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 w-full justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Edit Product
            </button>

            <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition">
              Delete Product
            </button>
          </div>

          <Link href={'/dashboard/product'} className="mt-6 text-blue-600 hover:underline text-sm">
            Back to Products
          </Link>
        </div>

        {/* RIGHT: Product Details Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">

          {/* Pricing Section */}
          <div className="space-y-3 border-b pb-6 text-xl">
            <div className="flex justify-between">
              <span className="text-gray-600">Buying Price:</span>
              <span className="font-semibold text-gray-800">₹{product.buying_price}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Selling Price:</span>
              <span className="font-semibold text-gray-800">₹{product.selling_price}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Stock Quantity:</span>
              <span className="font-semibold text-gray-800">{product.quantity_available}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold text-gray-800">{product.category}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Additional Information
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">Realme</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Color:</span>
              <span className="font-medium">Silver-Blue</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">RAM:</span>
              <span className="font-medium">8GB</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Storage:</span>
              <span className="font-medium">256GB</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Camera:</span>
              <span className="font-medium">
                50MP + 8MP + 2MP Triple Camera
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default page;
