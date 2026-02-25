export default function CartButton({ cart , increase, decrease, quantity }: any) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="w-full"
    >
      <div
        className={`
             flex items-center justify-between
             ${cart ? 'bg-white text-black' : 'bg-green-500 text-white'}
             px-4 py-2
             rounded-xl
             shadow-md
             font-bold
            `}
      >
        <button
          onClick={decrease}
          className="
          w-10 shadow h-9
          flex items-center justify-center
          text-xl
          border border-white/40
          rounded-xl
          hover:bg-green-700
          active:scale-95
          transition
        "
        >
          −
        </button>

        <span
          className="
          min-w-15
          text-center
          text-lg
          px-3 py-1
          border border-white/40
          rounded-xl
          bg-green-700/40 shadow
        "
        >
          {quantity}
        </span>

        <button
          onClick={increase}
          className="
          w-10 h-9 shadow
          flex items-center justify-center
          text-xl
          border border-white/40
          rounded-xl
          hover:bg-green-700
          active:scale-95
          transition
        "
        >
          +
        </button>
      </div>
    </div>
  );
}