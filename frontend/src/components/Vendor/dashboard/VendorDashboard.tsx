import React from 'react'

import { data } from '@/Data/vendor/vendorCartData'
import HeaderCarts from '@/components/Common/HeaderCarts'
import { manageCardData } from '@/Data/vendor/ManageCardData'
import ManageRouteCard from './ManageRouteCard'
import RecentOrderCard from '../orders/RecentOrderCard'
import ProductCard from '@/components/Common/ProductCard'
import { cookies } from 'next/headers'
import { getRecentOrders } from '@/services/operations/vendor/orders'
import OrderCardStructure from '../orders/IncomingOrderCardStructure'
import Image from 'next/image'
import { getTopSellingProducts } from '@/services/operations/vendor/productAndInventory'
import TopSellingProductCard from '../products/TopSellingProductCard'
import { vendorInfo } from '@/services/operations/vendor/dashboard'
import Link from 'next/link'

export async function VendorDashboard({user} : any) {

  const cookieStored = await cookies();
  let vendorDashboardInfo : any;
  let orders : any = [];
  let topSelingProducts : any = [];

  try{

    vendorDashboardInfo = await vendorInfo(cookieStored);
     console.log("Getting vendor info -> " , vendorDashboardInfo)

  } catch(err){
    console.log("Error comes in getting vendor dashboard info -> " , err)
  }

  try{
    orders = await getRecentOrders(cookieStored);
    // console.log(orders);

  } catch(err){
    console.log("Error comes in getting recent orders" ,  err);
  }

  try{

    topSelingProducts = await getTopSellingProducts(cookieStored);
    // console.log(topSelingProducts);

  } catch(err){
    console.log("Error comes in getting top selling products" , err);
  }


  
  return (
    <div className='flex flex-col gap-10 p-10 relative'>
      
      <h1 className='text-3xl font-bold opacity-55'>{`WELCOME ${(user.name).toUpperCase()}`}</h1>

      {/* Header cards */}
      <div className='w-full flex gap-10'>
        {data.map((item) => (
        <HeaderCarts key={item.key} count={vendorDashboardInfo[item.key]} Icon={item.Icon} smallIcon={item.smallIcon} cartName={item.cartName} color={item.color}/>
      ))}
      </div>

        {/* Hero section */}
      <div className='flex gap-10 w-full'>
          
          <div className='flex flex-col gap-10 border-gray-200 shadow rounded-xl w-[80%] p-4'>

            {/* Manage vendor's route card */}
            <div className='flex gap-10 items-center'>
              {
                manageCardData.map((card: any) => {
                  const {name , color , desc , Icon , key} = card
                  return <Link key={card.name} href={card.href}><ManageRouteCard name={name} color={color} desc={desc} Icon={Icon}/></Link>
                })
              }
            </div>

            {/* Manage Recent incoming order's */}
            
            <div className='flex flex-col gap-10 ml-10'>

               <h1 className='text-3xl font-bold opacity-55'>Recent Orders </h1>

              <div className='flex flex-wrap gap-5'>


                {
                  orders.length > 0 ?
                  
                  orders.map((order : any) => {
                    return <OrderCardStructure key={order.order_id} order={order} />
                  }) :

                  <div className='w-full h-full flex justify-center items-center border border-gray-50 shadow p-5'>
                    <h1 className='text-3xl font-medium opacity-55'>No Recent Orders Found 🧐</h1>
                  </div>
                }

                
              {/* <RecentOrderCard/>
              <RecentOrderCard/>
              <RecentOrderCard/>
              <RecentOrderCard/>
              <RecentOrderCard/>
              <RecentOrderCard/> */}
            </div>
            </div>

          </div>


          <div className='border border-gray-100 shadow rounded-xl w-[20%] h-100 flex flex-col p-5'>
            <h1 className='text-2xl font-bold opacity-55'>Earning Graph</h1>
          </div>

    
          <Image
            src="/images/girl.png"
            alt="girl image"
            width={420}
            height={420}
            className="object-cover absolute right-0 top-[50%] -translate-y-1/2"
          />
      </div>

      {/* Footer */}

      <div className='flex flex-col gap-10'>
        <h1 className='text-3xl font-bold opacity-55 ml-5'>Your Top Selling Products</h1>

        <div className='flex flex-wrap gap-10 border border-gray-50 rounded-2xl shadow p-5 px-15'>

          {
            topSelingProducts.length > 0 ? 
            topSelingProducts.map((p : any) => {
              return <TopSellingProductCard key={p.id} id={p.id} image={p.product_url} title={p.label} price={p.selling_price} totalSold={p.total_sold} totalRevenue={p.total_revenue}/>
            }) :

            <div className='text-3xl font-medium opacity-55'>
              No Top Selling Products Found 🧐
            </div>
          }

        </div>
      </div>
    </div>
  )
}

