import NewProductForm from "@/components/Vendor/products/NewProductForm";

async function Page({params} : {params : {productId : string}}) {

    const {productId} = await params;
    console.log("Getting product_id in draft product form -> " , productId);

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen py-12">

      {/* OUTER CARD */}
      <div className="w-[90%] bg-gray-100 rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

        <h1 className="text-5xl font-semibold mb-8 opacity-70">
          Draft Product
        </h1>

        {/* FORM CARD */}
        <NewProductForm draft={true} productId={productId}/>
       
      </div>
    </div>
  );
}

export default Page;