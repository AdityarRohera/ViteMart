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


function page() {
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
                    const {image , title , price , originalPrice , rating , reviews} = p
                    return <ProductCard image={image} title={title} price={price} originalPrice={originalPrice} rating={rating} reviews={reviews}/>
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
                    const {image , title , price , originalPrice , rating , reviews} = p
                    return <ProductCard image={image} title={title} price={price} originalPrice={originalPrice} rating={rating} reviews={reviews}/>
                })
            }
      </div>
      </div>
    </div>
  )
}

export default page
