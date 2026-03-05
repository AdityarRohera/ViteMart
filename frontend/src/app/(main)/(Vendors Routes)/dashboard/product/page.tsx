'use client'

import VendorPublishedProduct from "@/components/Vendor/products/VendorPublishedProduct";
import { getAllProducts, getTopSellingProducts } from "@/services/operations/vendor/productAndInventory";
import { useEffect, useState } from "react";
import Link from "next/link";
import VendorPublishedProductCard from "@/components/Vendor/products/VendorPublishedProductCard";

export default  function ProductsPage() {

  const [productData , setProductData] = useState([]);
  const [topSelling , setTopSelling] = useState([]);
  const [loading , setLoading] = useState(true);
  const ids = topSelling.map((p : any) => p.id);
  const [viewType, setViewType] = useState<'card' | 'row'>('card');
  console.log(productData , topSelling);

  useEffect(() => {
    const loadAllProducts = async() => {
      const products = await getAllProducts();
      setProductData(products);
    }

    const loadTopSelling = async() => {
      const res = await getTopSellingProducts();
      setTopSelling(res);
    }

    loadAllProducts();
    loadTopSelling();
    setLoading(false);
  } , []);

  if(loading) return <div>Loading...</div>

  return (
    <div className="p-12 flex flex-col gap-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Products</h1>

        <Link href={'/dashboard/product/new'} className="bg-blue-600 text-white px-6 py-3 
        rounded-lg hover:bg-blue-700 transition shadow">
          + Add New Product
        </Link>
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

      <div className="flex justify-between items-center px-10">
        {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-lg px-5 py-3 
        w-full max-w-xl outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex border rounded-lg shadow">

          <button
            onClick={() => setViewType('card')}
            className={`px-4 py-2 text-sm ${
              viewType === 'card'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            ⬜⬜
          </button>
          
          <button
            onClick={() => setViewType('row')}
            className={`px-4 py-2 text-sm ${
              viewType === 'row'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
             ☰
          </button>

      </div>
      </div>

      {/* PRODUCTS LIST */}
      { viewType === 'row' && <div className="flex flex-col gap-5">
        {productData.map((product : any) => {

          if(ids.includes(product.id)){
            return <Link key={product.id} href={`product/${product.id}`} className="">
            <VendorPublishedProduct topSelling={true} key={product.id} {...product} />
          </Link>
          }

          else {
            return <Link key={product.id} href={`product/${product.id}`} className="">
              <VendorPublishedProduct key={product.id} {...product} />
            </Link>
          }

        })}
      </div>}

      { viewType === 'card' && <div className="flex flex-wrap gap-10">
        {productData.map((product : any) => {

          if(ids.includes(product.id)){
            return <Link href={`product/${product.id}`} className="">
            <VendorPublishedProductCard topSelling={true} key={product.id} {...product} />
          </Link>
          }

          else {
            return <Link href={`product/${product.id}`} className="">
               <VendorPublishedProductCard key={product.id} {...product} />
            </Link>
          }

        })}
      </div>}

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
