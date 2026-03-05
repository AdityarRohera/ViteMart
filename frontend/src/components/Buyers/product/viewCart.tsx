'use client'

import Link from "next/link"

type Props = {
  cartQuantity: number
}

function ViewCart({ cartQuantity }: Props) {

//   if (!cartQuantity) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/shop/cart"
        className="flex items-center gap-3 bg-green-600 text-white 
        px-6 py-3 rounded-full shadow-xl 
        hover:bg-green-700 hover:scale-105 
        transition-all duration-200"
      >
        {/* Cart Icon */}
        <span className="text-xl">🛒</span>

        {/* Text */}
        <span className="font-semibold text-2xl">
          View Cart ({cartQuantity ?? 0})
        </span>

        {/* Arrow */}
       <span className="text-3xl font-bold">➡</span>
      </Link>
    </div>
  )
}

export default ViewCart