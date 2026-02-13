
import HeaderCarts from '@/components/Common/HeaderCarts';
import CategoryCard from '@/components/Buyers/CategoryCard';

import { categoriesData } from '@/Data/categories';
import { data } from '@/Data/buyersCartData';

export async function BuyerDashboard({user} : any) {

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
            {categoriesData.map((cat, i) => (
              <CategoryCard key={i} {...cat} />
            ))}
        </div>
      </div>


      <div className='flex gap-10 w-full mt-20'>

        {/* Recommendation for you */}
        <div className='w-[60%] border border-gray-100 shadow min-h-50 rounded-4xl p-5 flex flex-col gap-10 items-center'>
           <h1 className='text-3xl font-bold opacity-55'>Recommendations For You</h1>

           {
            <p>Not Products Yet</p>
           }
        </div>

        
        {/* Recent orders */}
        <div className='w-[40%] border border-gray-100 shadow min-h-50 rounded-4xl mt-10 p-5 flex flex-col items-center gap-15'>
          <h1 className='text-3xl font-bold opacity-55'>Recent Orders</h1>

          {
              <p>Not Ordered Yet</p>
          }
        </div>
      </div>



    </div>
  )
}