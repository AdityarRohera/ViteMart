'use client'

import { getIncomingOrders, updateOrderStatus } from "@/services/operations/vendor/orders";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderCard({order} : any) {

const {order_id , total_order_price , buyer_id , name , email , created_at , items , status} = order;

// Convert backend status to UI format
const formatStatus = (s: string) =>
  s === 'paid' ? 'PENDING' : s.toUpperCase();

const [selectedStatus , setSelectedStatus] = useState(formatStatus(status));
const [loading, setLoading] = useState(false);

const router = useRouter();
console.log(selectedStatus);


const changeHandler = (e: any) => {
  setSelectedStatus(e.target.value);
};

const updateHandler = async () => {
  try {
    setLoading(true);

    const backendStatus =
      selectedStatus === 'PENDING'
        ? 'paid'
        : selectedStatus.toLowerCase();

    await updateOrderStatus(backendStatus, order_id);

    setLoading(false);
  } catch (err) {
    console.log("Update error", err);
    setLoading(false);
  }
};


return(

<div className="border rounded-xl p-6 flex flex-col gap-1 hover:shadow-xl shadow transition text-xl bg-gray-50">

{/* Top Section */}

<div className="flex justify-between items-start">

<div className="flex flex-col gap-1">

<h2 className="font-semibold text-xl">
Order #{order_id.slice(0,8)}
</h2>

<p className="text-md text-gray-700">
{name}
</p>

<p className="text-md text-gray-500">
789 Pine Street, Los Angeles
</p>

<p className="text-sm text-gray-400 mt-1">
{new Date(created_at).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})}
</p>

</div>


<div className="flex flex-col items-end gap-3">

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-medium">
    {selectedStatus}
</span>

<Link href={`/dashboard/orders/${order_id}`} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition">
View Order
</Link>

</div>

</div>


{/* Product Preview */}

<div className="flex items-center gap-2 border-t pt-1">

<div className="flex items-center">

{items.map((item : any)=>(
<div
key={item.product_id}
className={`w-15 h-15 rounded-full border-2 border-white overflow-hidden -ml-2 first:ml-0`}
>

<Image
src={item.image}
alt="product"
width={20}
height={20}
className="object-cover w-full h-full"
/>

</div>
))}

</div>

{items.length > 3 && (
<span className="text-sm text-gray-500">
+{items.length - 3}
</span>
)}

</div>


{/* Bottom Section */}

<div className="flex justify-between items-center border-t pt-2">

<p className="font-semibold text-gray-800">
Total : {total_order_price}
</p>

<div className="flex items-center gap-3">

<select onChange={changeHandler} value={selectedStatus} className="border px-3 py-1.5 rounded-md text-sm">
<option>PENDING</option>
<option>SHIPPED</option>
<option>DELIVERED</option>
</select>

<button onClick={updateHandler} className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700 transition">
Update
</button>

</div>

</div>

</div>

)

}