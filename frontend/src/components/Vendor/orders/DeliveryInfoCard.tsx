

import Image from "next/image";

export default function DeliveryInfoCard({name , email , date} : any) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-5">

      <h2 className="font-semibold text-2xl">
        Delivery Information
      </h2>

      <div className="flex gap-4">

        <Image
          src="/products/shirt.jpg"
          width={100}
          height={100}
          alt="user"
          className="rounded-lg object-cover"
        />

        <div className="flex flex-col gap-1 text-md">

          <p className="font-medium text-gray-900">
            {name}
          </p>

          <p className="text-gray-500">
            789 Pine Street
          </p>

          <p className="text-gray-500">
            Los Angeles, CA 90016
          </p>

          <p className="text-gray-500">
            (123) 456-7890
          </p>

          <p className="text-blue-600">
            {email}
          </p>

        </div>

      </div>

      <div className="border-t pt-3 text-2xl text-gray-400">
        {new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })}
      </div>

    </div>
  );
}