import React from 'react'

interface Props{
    orderid?: string
    item?: string
    seller?: string
    quantity?: number
    amount?: number
    header?: boolean
}

function RecentOrderRow({
    orderid,
    item,
    seller,
    quantity,
    amount,
    header = false
}:Props) {

  return (

    <div className={`
        grid grid-cols-5 
        px-6 py-3 
        items-center
        gap-2
        border rounded-2xl shadow
        ${header
          ? 'text-gray-500 bg-gray-50 font-semibold'
          : 'text-gray-700 hover:bg-gray-50'}
    `}>

        <p>
            {header ? "Order ID" : `#${orderid?.slice(0,8)}`}
        </p>

        <p>
            {header ? "Item" : item}
        </p>

        <p className={header ? "" : "text-blue-500"}>
            {header ? "Seller" : seller}
        </p>

        <p>
            {header ? "Quantity" : quantity}
        </p>

        <p className={header ? "" : "font-medium"}>
            {header ? "Amount" : `₹${amount}`}
        </p>

    </div>

  )
}

export default RecentOrderRow