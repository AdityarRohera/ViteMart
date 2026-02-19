'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { use } from 'react'
import { createInventory, fetchProduct, getInventory, updateProduct } from '@/services/operations/vendor/productAndInventory';
import { useRouter } from 'next/navigation';

function page({params} : {params : Promise<{productID : string}>}) {

    const {productID} = use(params);
    console.log("Getting product_id in manage inventory -> " , productID);

    const [inventoryData, setInventoryData] = useState({
        quantity_available: "",
        location: "",
        product_id: "",
    });

    // console.log(inventoryData);

    const [product , setProduct] = useState(null);
    const [loading , setLoading] = useState(true);
    const router = useRouter();

    const changeHandler = (e : any) => {
                const {name , value} = e.target;
                setInventoryData((prev : any) => {
                    return {
                        ...prev , [name] : value
                    }
                })
            }

        // submit inventory form handler 
        const handleSubmit = async(e : any) => {
          try{
            
            e.preventDefault();
            const {name} = e.target;
            console.log("After submit inventory form -> " , name);
            
            setLoading(true);
             await createInventory({...inventoryData , status : name});
            setLoading(false);

            router.push('/dashboard/product');


          } catch(err){
            console.log("Error comes in submit inventory form -> " , err);
          }
        }

        useEffect(() => {
          setInventoryData(prev => ({ ...prev, product_id: productID }));
          
          const loadProduct = async () => {
            const data = await fetchProduct(productID);
            setProduct(data);
            setLoading(false);
          };

          loadProduct();
        }, [productID]);


        useEffect(() => {
          const loadInventory = async() => {
            const inventory = await getInventory(productID);
            console.log(inventory)
            
            if(inventory){
                setInventoryData(
                  {quantity_available : inventory.quantity_available , location : inventory.location , product_id : `${inventory.product_id}`}
                );
            }
          }

          loadInventory();

        } , [productID])

        if(loading) return "Loading..."

        if(!productID || !product){
          return <div>Invalide Product Id</div>
        }



  return (
    <div className="flex justify-center bg-gray-200 min-h-screen py-12">

      {/* OUTER CARD */}
      <div className="w-[90%] bg-gray-100 rounded-2xl shadow-lg p-10 flex flex-col items-center">

        <h1 className="text-5xl font-semibold mb-8 opacity-70">
            Manage Inventory
        </h1>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow p-8 w-[55%]">

          <form onSubmit={handleSubmit} action="" className='flex flex-col gap-6'>
            {/* Quantity_available */}
            <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Quantity Available
              </h2>

             <Input className="h-12 shadow" placeholder="0" name="quantity_available" value={inventoryData.quantity_available} onChange={changeHandler} />
            </div>


            {/* Location */}
             <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Location
              </h2>
              <textarea
                placeholder="Enter your location"
                className="w-full border rounded-lg p-3 shadow text-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                name='location'
                rows={4}
                value={inventoryData.location}
                onChange={changeHandler}
              />
            </div>

                {/* Buttons */}
                <div className="flex justify-between mt-10 mx-10">
                  <button onClick={handleSubmit} className="bg-yellow-200 hover:bg-yellow-300 
                  text-black font-medium px-5 py-2 rounded-md transition" name='Draft'>
                    {loading ? "Loading..." : "Save as Draft"}
                  </button>
        
                  <button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 
                  text-white px-5 py-2 rounded-md transition" name='Published'>
                     {loading ? "Loading..." : "Product Publish"}
                  </button>
                </div>
          </form>



        </div>

       
      </div>
    </div>
  )
}

export default page
