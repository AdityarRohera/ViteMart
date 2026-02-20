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
import { buyersShopProducts } from '@/services/operations/buyer/products'
import Link from 'next/link'
import { getAllOrderItems } from '@/services/operations/buyer/orderAndCart'


async function page() {

  const cookieStored = await cookies()
  const products = await buyersShopProducts(cookieStored);

  const AllOrderItems = await getAllOrderItems(cookieStored);
  console.log(AllOrderItems)




  return (
    <div className='flex flex-col gap-5 p-10'>

        <div className='flex flex-col gap-10 px-5'>
            <h1 className='text-4xl font-bold opacity-55'>SHOPS</h1>

            {/* Serach and categories components */}
            <div className='flex justify-between items-center pr-40'>
                <InputGroup className="max-w-xs h-12">
                    <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                          <Search />
                        </InputGroupAddon>
                    <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                </InputGroup>

                <CategoryFilter/>
            </div>

        </div>

        
    {/* Products for you */}
      <div className=' flex flex-col gap-5 p-5'>
        <h1 className='text-3xl font-medium opacity-55'>PRODUCTS FOR YOU</h1>
        <div className='w-full flex flex-wrap items-center gap-5'>
            {
                products.map((p : any) => {
                    const {id , product_url , label , selling_price} = p

                     const cartItem = AllOrderItems.find(
                        (item: any) => item.product_id === id
                     );

                    return (
                      <Link key={id} href={`/shop/${id}`} scroll={true}>
                          <ProductCard
                            id={id}
                            image={product_url}
                            title={label}
                            price={selling_price}
                            originalPrice={selling_price * 1.1}
                            rating={4.1}
                            reviews={13321}
                            cartQuantity={cartItem?.quantity ?? 0}
                            orderItemID={cartItem?.id}
                          />
                      </Link>
                    )
                })
            }
      </div>
      </div>

    {/* Top Selling Products */}
      <div className='flex flex-col gap-5 p-5'>
        <h1 className='text-3xl font-medium opacity-55'>TOP SELLING PRODUCTS</h1>
        <div className='w-full flex flex-wrap items-center gap-5'>
             {
                products.map((p : any) => {
                    const {id , product_url , label , selling_price , originalPrice , rating , reviews} = p
                   console.log(selling_price * 1.1)
                    return <Link key={id} href={`/shop/${id}`} scroll={true}>
                        <ProductCard key={id} id={id} image={product_url} title={label} price={selling_price} originalPrice={selling_price * 1.1} rating={4.1} reviews={13321}/>
                      </Link>
                })
            }
      </div>
      </div>
    </div>
  )
}

export default page
