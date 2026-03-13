


// 'use client'
import React from 'react'

import { products } from '@/Data/product'
import ProductCard from '@/components/Common/ProductCard'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import CategoryFilter from '@/components/Common/CategoryFilter'
import { cookies } from 'next/headers'
import { buyersCategoryProducts, buyersShopProducts } from '@/services/operations/buyer/products'
import Link from 'next/link'
import { getAllOrderItems } from '@/services/operations/buyer/orderAndCart'
import ViewCart from '@/components/Buyers/product/viewCart'


async function page({ params }: { params: { categoryName: string } }) {

  const {categoryName} = await params;
   const categoryId = categoryName.split('_')[1];
   const categoryDisplayName = categoryName.split('_')[0];

  const cookieStored = await cookies();

   let products: any[] = [];
   let AllOrderItems: any = { items: [] };


  try {
    products = await buyersCategoryProducts(categoryId);
  } catch (error) {
    console.log("Failed to fetch products", error);
  }


   try {
    AllOrderItems = await getAllOrderItems(cookieStored);
    console.log(AllOrderItems)

  } catch (error) {
    console.error("Failed to fetch cart items", error);
    AllOrderItems = { items: [] }; // fallback
  }

  console.log(AllOrderItems.total_products)


  return (
    <div className='flex flex-col gap-8 p-10 bg-gray-50 min-h-screen'>

{/* Breadcrumb */}
<div className='text-sm text-gray-400'>
Dashboard / Shop /
<span className='text-gray-700 font-medium ml-2'>
{categoryDisplayName}
</span>
</div>


{/* Category Banner */}
<div className='w-full h-36 bg-white rounded-xl shadow-sm flex items-center justify-between px-10 border'>

<div>
<h1 className='text-3xl font-bold text-gray-800'>
{categoryDisplayName}
</h1>

<p className='text-gray-400 mt-1'>
{products.length} products available
</p>
</div>

<select className='border rounded-lg p-3 bg-white'>
<option>Sort : Latest</option>
<option>Price Low → High</option>
<option>Price High → Low</option>
<option>Top Rated</option>
</select>

</div>


{/* Search + Category Filter */}
<div className='flex justify-between items-center'>

<InputGroup className="w-96 h-12 bg-white rounded-lg">

<InputGroupInput
placeholder={`Search in ${categoryDisplayName}`}
/>

<InputGroupAddon>
<Search size={18}/>
</InputGroupAddon>

<InputGroupAddon align="inline-end">
{products.length}
</InputGroupAddon>

</InputGroup>

<CategoryFilter/>

</div>


{/* Main Layout */}
<div className='flex gap-8'>

{/* Filters Sidebar */}
<div className='w-64 bg-white rounded-xl p-6 shadow-sm border flex flex-col gap-6 h-fit'>

<h2 className='font-semibold text-gray-700'>
Filters
</h2>

<div>
<p className='text-sm font-medium mb-2'>
Price
</p>

<input type="range" className='w-full'/>
</div>


<div>
<p className='text-sm font-medium mb-2'>
Rating
</p>

<div className='flex flex-col gap-2 text-sm text-gray-500'>

<label>
<input type="checkbox"/> 4★ & above
</label>

<label>
<input type="checkbox"/> 3★ & above
</label>

</div>

</div>


<div>
<p className='text-sm font-medium mb-2'>
Availability
</p>

<label className='text-sm text-gray-500'>
<input type="checkbox"/> In Stock
</label>

</div>

</div>


{/* Products */}
<div className='flex-1'>

{
products.length === 0 ?

<div className='w-full text-center py-32 text-gray-400 text-lg'>

No products found in this category

</div>

:

<div className='grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-6'>

{
products.map((p:any)=>{

const cartItem =
AllOrderItems.items.find(
(item:any)=> item.product_id === p.id
);

return(

<Link
key={p.id}
href={`/shop/${p.id}`}
>

<ProductCard
id={p.id}
image={p.product_url}
title={p.label}
price={p.selling_price}
originalPrice={p.selling_price * 1.1}
rating={4.2}
reviews={1200}
cartQuantity={cartItem?.quantity ?? 0}
orderItemID={cartItem?.order_item_id}
/>

</Link>

)

})
}

</div>

}

</div>

</div>


{/* Floating Cart */}
{
AllOrderItems.total_products > 0 &&

<div className='fixed bottom-10 right-10'>

<ViewCart
cartQuantity={AllOrderItems.total_products}
/>

</div>

}

</div>
  )
}

export default page
