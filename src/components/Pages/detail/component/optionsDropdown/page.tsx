import { useState } from "react";

export default function MarketCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* CARD */}
      <div className="border dark:border-gray-700 border-gray-200 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700">
        {/* HEADER */}
        <div
          onClick={() => setOpen(!open)}
          className="
            cursor-pointer select-none
            flex flex-col gap-3
            md:flex-row md:items-center md:justify-between
          "
        >
          {/* LEFT: Yes + VOL */}
          <div className="flex items-center justify-between md:justify-start md:gap-4 w-full md:w-auto">
            <div>
              <p className="font-bold dark:text-white text-black text-lg leading-tight">
                Yes
              </p>
              <span className="dark:text-gray-300 text-gray-500 text-sm">
                $0.00 VOL.
              </span>
            </div>

            {/* % */}
            <h4 className="text-2xl font-semibold dark:text-white text-black shrink-0 md:ml-60">
              33.3%
            </h4>
          </div>

          {/* RIGHT: Buttons (same row on desktop) */}
          <div
            className="flex gap-2 w-full md:w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Sell clicked");
              }}
              className="flex-1 md:flex-none px-2 py-1 md:py-2 rounded-md
                         text-md font-semibold bg-red-500/20 text-red-400
                         border border-red-500/30 hover:bg-red-500/30 transition"
            >
              Sell $0.33
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Buy clicked");
              }}
              className="flex-1 md:flex-none px-2 py-1 md:py-2 rounded-md
                         text-md font-semibold bg-emerald-500/20 text-emerald-400
                         border border-emerald-500/30 hover:bg-emerald-500/30 transition"
            >
              Buy $0.33
            </button>
          </div>
        </div>
      </div>

      {/* ACCORDION BODY */}
      {open && (
        <div className="mt-2 border dark:border-gray-700 border-gray-200 rounded-lg p-4">
          <div className="border-y dark:border-gray-700 border-gray-200 py-2">
            <div className="flex items-center">
              <div className="w-1/3 text-left">
                <h4 className="md:text-sm text-xs font-semibold dark:text-white/70 text-black">
                  Invested
                </h4>
              </div>
              <div className="w-1/3 text-center">
                <h4 className="md:text-sm text-xs font-semibold dark:text-white/70 text-black">
                  PNL
                </h4>
              </div>
              <div className="w-1/3 text-right">
                <h4 className="md:text-sm text-xs font-semibold dark:text-white/70 text-black">
                  Buy Shares
                </h4>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-1">
            <div className="w-1/3 text-left dark:text-gray-300 text-gray-600">
              $0.00
            </div>
            <div className="w-1/3 text-center dark:text-gray-300 text-gray-600">
              $0.00
            </div>
            <div className="w-1/3 text-right dark:text-gray-300 text-gray-600">
              $0.00
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
