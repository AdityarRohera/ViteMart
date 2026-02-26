import Image from "next/image";

export default function ProductRow({product_name , quantity , buying_price , price , image} : any) {
    // console.log(product_name , image)
  return (
    <div className="flex items-center py-4 hover:bg-gray-50 transition border border-gray-50 shadow rounded-xl p-2">

      {/* Product */}

      <div className="flex items-center gap-4 flex-1">

        <Image
          src={image}
          width={150}
          height={100}
          alt="product"
          className="rounded-lg object-cover border border-gray-50 shadow"
        />

        <div>

          <p className="font-medium text-2xl">
            {product_name}
          </p>

          <p className="text-sm text-gray-500">
            {product_name} x {quantity}
          </p>

        </div>

      </div>

      {/* Quantity */}

      <p className="w-24 text-center text-sm">
        {quantity}
      </p>

      {/* Buying */}

      <p className="w-32 text-center text-gray-600 text-md">
        {buying_price}
      </p>

      {/* Selling */}

      <p className="w-32 text-center text-lg">
        {price}
      </p>

      {/* Total */}

      <p className="w-32 text-center font-medium text-xl">
        {price * quantity}
      </p>

    </div>
  );
}