import DeliveryInfoCard from "@/components/Vendor/orders/DeliveryInfoCard";
import OrderedProducts from "@/components/Vendor/orders/OrderedProducts";
import PaymentInfoCard from "@/components/Vendor/orders/PaymentInfoCard";
import { getSingleIncomingOrders } from "@/services/operations/vendor/orders";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const cookieStored = await cookies();

  let singleOrder;
  console.log(singleOrder);

  try{
    singleOrder = await getSingleIncomingOrders(cookieStored , orderId);
  } catch(err){
    console.log("Fetch to fetch order info" , err);
  }

  if(!singleOrder){
    return <div>Failed to fetch order info </div>
  }

  const {buyer_id , name , email , order_id , created_at , total_order_price , items} = singleOrder


  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            Order # {orderId.slice(0,8)}
          </h1>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Delivered
          </span>
        </div>

        <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
          Back to Orders
        </button>

      </div>

      {/* Top Section */}
      <div className="grid grid-cols-2 gap-6">
        <DeliveryInfoCard name={name} email={email} date={created_at}/>
        <PaymentInfoCard total={total_order_price} />
      </div>

      {/* Products */}
      <OrderedProducts items={items} total_amount={total_order_price}/>

    </div>
  );
}