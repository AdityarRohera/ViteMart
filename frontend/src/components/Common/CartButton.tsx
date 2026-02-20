

export default function CartButton({increase , decrease , quantity} : any) {
   

    return (
        <div onClick={(e) => {e.preventDefault() , e.stopPropagation()}} className="border">

            <div
            className="flex items-center gap-4
            bg-green-600 text-white px-4 py-2 rounded-lg"
            >
            <button
                onClick={decrease}
                className="text-lg font-bold"
            >
                -
            </button>

            <span className="font-semibold text-lg">
                {quantity}
            </span>

            <button
                onClick={increase}
                className="text-lg font-bold"
            >
                +
            </button>
            </div>
            
        </div>
    );
    }
