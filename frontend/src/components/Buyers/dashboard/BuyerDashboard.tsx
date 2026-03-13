
import HeaderCarts from '@/components/Common/HeaderCarts';
import CategoryCard from '@/components/Buyers/CategoryCard';

import { categoriesData } from '@/Data/categories';
import { data } from '@/Data/buyersCartData';
import { fetchCategories } from '@/services/operations/common';
import { getAllOrderItems, getRecentOrders } from '@/services/operations/buyer/orderAndCart';
import { cookies } from 'next/headers';
import RecentOrderRow from './RecentOrderRow';
import { getRecommendationProducts } from '@/services/operations/buyer/products';
import ProductCard from '@/components/Common/ProductCard';
import Link from 'next/link';

export async function BuyerDashboard({user} : any) {

  const cookieStore = await cookies();

  let categories : any[] = [];
  let recentOrders : any[] = [];
  let recommendationProducts : any[] = [];
   let AllOrderItems: any = { items: [] };
  // console.log('Getting recent orders**********8' , recentOrders);

  try{
    categories = await fetchCategories()

  } catch(err){
    console.log("Error comes in fetching categories" , err);
  }


  // fetching recent order products of buyers
  try{
    recentOrders = await getRecentOrders(cookieStore);

  } catch(err){
    console.log("Error comes in fetching recent order items" , err);
  }

  // fetching recondations products 
  try{
    recommendationProducts = await getRecommendationProducts(cookieStore);

  } catch(err){
    console.log("Error comes in getting recommentation products ##########" , err)
  }

   try {
      AllOrderItems = await getAllOrderItems(cookieStore);
      // console.log(AllOrderItems)
  
    } catch (error) {
      console.error("Failed to fetch cart items", error);
      AllOrderItems = { items: [] }; // fallback
    }

  return(
    <div className='flex flex-col gap-5 p-10'>

      {/* Header carts  */}
      
      <div className='w-full flex gap-10'>
        {data.map((item, i) => (
        <HeaderCarts key={i} {...item} />
      ))}
      </div>


      {/* categories cards */}
      <div className='flex flex-col gap-15 mt-20 border border-gray-100 rounded-3xl p-5 shadow-xl hover:scale-101 transition-all duration-700 ease-out'>
        <h1 className='text-4xl font-bold opacity-55 m-auto'>SHOP BY CATEGORY</h1>
        <div className="flex flex-wrap gap-10 justify-center">
            {categories.map((cat : any) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
        </div>
      </div>

      


      <div className='flex gap-10 w-full mt-20'>

        {/* Recommendation for you */}
        <div className='w-[50%] border border-gray-100 shadow min-h-50 max-h-250 overflow-auto rounded-4xl p-5 flex flex-col gap-10 items-center hover:scale-101 transition-all duration-700'>
           <h1 className='text-3xl font-bold opacity-55'>Recommendations For You</h1>

           {

            recommendationProducts?.length > 0 ? 
            (
              <div className='flex flex-wrap gap-4'>
                {
                  recommendationProducts.map((product : any) => {
                const {id , product_url , label , selling_price} = product;

                const cartItem = AllOrderItems.items.find(
                        (item: any) => item.product_id === id
                     );

                return <Link key={id} href={`/shop/${id}`} scroll={true}>
                          <ProductCard
                            id={id}
                            image={product_url}
                            title={label}
                            price={selling_price}
                            originalPrice={selling_price * 1.1}
                            rating={4.1}
                            reviews={13321}
                            cartQuantity={cartItem?.quantity ?? 0}
                            orderItemID={cartItem?.order_item_id}
                          />
                      </Link>
              })
                }
                
              </div>
            )
            :

            (<p>Not Products Yet</p>)
           }
        </div>

        
        {/* Recent orders */}
        <div className='w-[50%] border border-gray-100 shadow min-h-50 rounded-4xl mt-10 p-5 flex flex-col items-center gap-15 hover:scale-101 transition-all duration-700'>
          <h1 className='text-3xl font-bold opacity-55'>Recent Orders</h1>

          {
              recentOrders?.length > 0 ? 
              
              (
                <div className='flex flex-col justify-center gap-2'>
                  <RecentOrderRow header={true}/>
                  {recentOrders.map((order : any) => <RecentOrderRow key={order.id} {...order} />)}
                </div>
              )
              :
              (<p>Not Ordered Yet</p>)
          }

        </div>
      </div>



    </div>
  )
}