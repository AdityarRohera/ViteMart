'use client'

import VendorPublishedProduct from "@/components/Vendor/products/VendorPublishedProduct";
import { getAllProducts } from "@/services/operations/vendor/productAndInventory";
import { useEffect, useState } from "react";

export default  function ProductsPage() {

  const [productData , setProductData] = useState([]);
  const [loading , setLoading] = useState(true);
  console.log(productData)

  useEffect(() => {
    const loadAllProducts = async() => {
      const products = await getAllProducts();
      setProductData(products);
      setLoading(false);
    }

    loadAllProducts();
  } , []);

  const products = [
    {
      image: "/products/headphone.jpg",
      name: "Wireless Headphones",
      shortDesc: "Premium noise cancelling headphones with 30hr battery backup.",
      createdAt: "22 Apr 2024",
      buyingPrice: "80",
      sellingPrice: "150",
      status: "Published",
    },
    {
      image: "/products/watch.jpg",
      name: "Smartwatch",
      shortDesc: "Fitness smartwatch with heart-rate & sleep tracking.",
      createdAt: "20 Apr 2024",
      buyingPrice: "90",
      sellingPrice: "160",
      status: "Published",
    },
    {
      image: "/products/blender.jpg",
      name: "Blender",
      shortDesc: "Heavy duty kitchen blender for daily use.",
      createdAt: "18 Apr 2024",
      buyingPrice: "70",
      sellingPrice: "120",
      status: "Published",
    },
    {
      image: "/products/coffee.jpg",
      name: "Coffee Maker",
      shortDesc: "Automatic coffee maker with temperature control.",
      createdAt: "15 Apr 2024",
      buyingPrice: "60",
      sellingPrice: "100",
      status: "Published",
    },
    {
      image: "/products/gaming.jpg",
      name: "Gaming Headset",
      shortDesc: "RGB headset with deep bass and mic.",
      createdAt: "10 Apr 2024",
      buyingPrice: "110",
      sellingPrice: "190",
      status: "Draft",
    },
  ];

  if(loading) return <div>Loading...</div>

  return (
    <div className="p-12 flex flex-col gap-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Products</h1>

        <button className="bg-blue-600 text-white px-6 py-3 
        rounded-lg hover:bg-blue-700 transition shadow">
          + Add New Product
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-8 text-lg font-medium border-b pb-2">
        <button className="text-blue-600 border-b-2 border-blue-600 pb-1">
          All (5)
        </button>
        <button className="text-gray-500 hover:text-black">
          Drafts (1)
        </button>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-lg px-5 py-3 
        w-full max-w-xl outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* PRODUCTS LIST */}
      <div className="flex flex-col gap-5">
        {productData.map((product : any) => (
          <VendorPublishedProduct key={product.id} {...product} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          {"<"}
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          1
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          3
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          {">"}
        </button>
      </div>
    </div>
  );
}
