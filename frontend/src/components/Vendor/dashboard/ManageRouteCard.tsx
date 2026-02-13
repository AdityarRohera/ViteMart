import Image from "next/image";

function ManageRouteCard({ Icon, color, name, desc }: any) {
  return (
    <div
      className={`w-85 h-40 rounded-2xl shadow-md px-6 cursor-pointer
      hover:scale-105 transition border relative flex items-center
      ${color || "bg-gray-100"}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-sm">
        <Image src={Icon} width={40} height={40} alt="icon" />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center ml-5 flex-1">
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Arrow */}
      <span className="text-2xl font-semibold opacity-60">
        {">"}
      </span>
    </div>
  );
}

export default ManageRouteCard;


