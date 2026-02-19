
import NewProductForm from "@/components/Vendor/products/NewProductForm";

function Page() {

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen py-12">

      {/* OUTER CARD */}
      <div className="w-[90%] bg-gray-100 rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

        <h1 className="text-5xl font-semibold mb-8 opacity-70">
          Add New Product
        </h1>

        {/* FORM CARD */}
        <NewProductForm/>
       
      </div>
    </div>
  );
}

export default Page;
