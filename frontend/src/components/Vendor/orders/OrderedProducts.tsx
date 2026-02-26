

// import ProductRow from "./ProductRow"

import ProductRow from "./ProductRow";

export default function OrderedProducts({items , total_amount} : any) {

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-6">

      <h2 className="font-semibold text-2xl">
        Ordered Products
      </h2>

      {/* Table Header */}

      <div className="flex text-md text-gray-500 font-medium border-b pb-2">

        <p className="flex-1 ml-2 text-xl">Product</p>

        <p className="w-24 text-center">
          Quantity
        </p>

        <p className="w-32 text-center">
          Buying Price
        </p>

        <p className="w-32 text-center">
          Selling Price
        </p>

        <p className="w-32 text-center">
          Total
        </p>

      </div>

      <div className="flex flex-col gap-2">

        {/* <ProductRow />
        <ProductRow /> */}
        
        {
            items.map((item : any) => {
                // const {product_name , quantity , price , product_url} = item;
                return <ProductRow key={item.product_id} {...item}/>
            })
        }

      </div>

      <div className="flex justify-end pt-4 border-t">

        <p className="font-semibold text-2xl">
          Total Order Price : {total_amount}
        </p>

      </div>

    </div>
  );
}