

export default function PaymentInfoCard({total} : any) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-6">

      <h2 className="font-semibold text-lg">
        Payment Details
      </h2>

      <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3">

        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Subtotal</p>
          <p>{total}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Shipping Cost</p>
          <p>0</p>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <p>Total</p>
          <p>{total}</p>
        </div>

      </div>

      {/* Payment Method */}

      <div className="flex justify-between items-center">

        <p className="text-sm text-gray-600">
          Payment Method
        </p>

        <span className="border px-3 py-1 rounded-md text-sm bg-gray-50">
          PayPal
        </span>

      </div>

      {/* Status */}

      <div className="flex justify-between items-center">

        <p className="text-sm text-gray-600">
          Order Status
        </p>

        <select className="border px-3 py-1 rounded-md text-sm">

          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>

        </select>

      </div>

      <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Update Status
      </button>

    </div>
  );
}