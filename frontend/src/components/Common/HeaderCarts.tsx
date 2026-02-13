'use client';

import Image from "next/image";

function HeaderCarts({ Icon, count, smallIcon, cartName, color }: any) {
  return (
    <div className={`w-80 rounded-2xl shadow-lg p-6 cursor-pointer 
      hover:scale-105 transition ${color || "bg-gray-100"}`}>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src={Icon} width={50} height={50} alt={cartName} />
          <h1 className="text-3xl font-bold">{count}</h1>
        </div>

        <Image src={smallIcon} width={40} height={40} alt="icon" />
      </div>

      <h2 className="text-xl font-semibold mt-6">
        {cartName}
      </h2>
    </div>
  );
}

export default HeaderCarts;
