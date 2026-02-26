'use client'

import { useEffect , useState } from 'react'

import { Input } from '@/components/ui/input'
import IncomingOrderCard from '@/components/Vendor/orders/IncomingOrderCart'
import { getIncomingOrders } from '@/services/operations/vendor/orders';
import OrderCard from '@/components/Vendor/orders/IncomingOrderCart';
import OrderCardStructure from '@/components/Vendor/orders/IncomingOrderCardStructure';

export default function Page() {

    const [incomingOrders , setIncomingOrders] = useState([]);
    const [viewType, setViewType] = useState<'card' | 'row'>('card');
    console.log(incomingOrders)
    const [loading , setLoading] = useState(true);

    const orders = [1,2,3] // dummy

useEffect(() => {
    const loadOrders = async() => {
        const res = await getIncomingOrders();
        setIncomingOrders(res);
        setLoading(false);
    }
    
    loadOrders();
} , [])



return (

<div className="p-10 flex flex-col gap-8">

<h1 className="text-3xl font-semibold text-gray-700">
Incoming Orders
</h1>

{/* Filters */}

<div className="flex gap-6 text-sm font-medium">

<div className="flex gap-2 border-b-2 border-blue-500 pb-1 cursor-pointer">
<span>All</span>
<span className="text-gray-500">(8)</span>
</div>

<div className="flex gap-2 text-gray-500 cursor-pointer">
<span>Pending</span>
<span>(2)</span>
</div>

<div className="flex gap-2 text-gray-500 cursor-pointer">
<span>Shipped</span>
<span>(3)</span>
</div>

<div className="flex gap-2 text-gray-500 cursor-pointer">
<span>Delivered</span>
<span>(3)</span>
</div>

</div>


{/* Search */}

<div className="flex gap-4">

<Input
placeholder="🔍 Search orders..."
className="h-11"
/>

<select className="border rounded-md px-4 text-sm">
<option>All Status</option>
<option>Pending</option>
<option>Shipped</option>
<option>Delivered</option>
</select>

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


{/* 👇 VIEW TOGGLE HERE */}
{
    viewType === 'card' ? 
    (
        <div className="flex flex-wrap gap-5">

            {incomingOrders.map((order,index)=>(
            <OrderCardStructure order={order} key={index}/>
            ))}

        </div>
        
    ) : 
    (
        <div className="flex flex-col gap-5">

            {incomingOrders.map((order,index)=>(
            <IncomingOrderCard order={order} key={index}/>
            ))}

        </div>
    )
}



{/* Orders */}

</div>

)

}