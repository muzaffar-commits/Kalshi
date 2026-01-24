import { useState } from "react";
import { truncateValue } from "@/utils/Content";

export default function MarketCard({ data = [], handleBuySell }) {
  const [openRows, setOpenRows] = useState<number[]>([]);

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const toggleRow = (id: number) => {
    setOpenRows(
      (prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id) // close only this row
          : [...prev, id], // open this row
    );
  };

  return (
    <div className="w-full space-y-3">
      {data.map((row, index) => {
        const isOpen = openRows.includes(row.id);
        const pnl = Number(row?.userPosition?.pnl || 0);

        return (
          <div key={row.id} className="relative">
            {isOpen && (
              <div className="absolute delay-500 left-0 top-0 h-full w-1 bg-emerald-500 rounded-l-lg" />
            )}

            <div
              onClick={() => getToken && toggleRow(row.id)}
              className={`
                border border-gray-200 dark:border-gray-700
                rounded-lg px-4 py-3
                transition cursor-pointer
                hover:bg-gray-100 dark:hover:bg-gray-700/60
                ${
                  isOpen
                    ? "rounded-b-none border-b-0 bg-gray-50 dark:bg-gray-700/40"
                    : ""
                }
              `}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <p className="font-semibold text-base text-black dark:text-white">
                    {row?.name || "--"}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ${truncateValue(row?.trading?.totalVolume || 0)} VOL.
                  </span>
                </div>

                <div className="flex flex-row gap-10">
                  <div className="text-lg font-semibold text-black dark:text-white whitespace-nowrap">
                    {truncateValue(row?.price * 100, 2)}%
                  </div>

                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleBuySell(row, "sell", index)}
                      className="
                      px-3 py-1.5 rounded-md text-sm font-medium
                      bg-red-500/15 text-red-500
                      border border-red-500/30
                      hover:bg-red-500/25 transition
                    "
                    >
                      Sell ${truncateValue(row?.price)}
                    </button>

                    <button
                      onClick={() => handleBuySell(row, "buy", index)}
                      className="
                      px-3 py-1.5 rounded-md text-sm font-medium
                      bg-emerald-500/15 text-emerald-500
                      border border-emerald-500/30
                      hover:bg-emerald-500/25 transition
                    "
                    >
                      Buy ${truncateValue(row?.price)}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`
                grid transition-all duration-300 ease-in-out origin-top
                ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div className="overflow-hidden">
                <div
                  className="
                    border border-gray-200 dark:border-gray-700
                    border-t-0 rounded-b-lg
                    p-4 bg-gray-50 dark:bg-gray-800
                  "
                >
                  {/* HEADER */}
                  <div className="flex text-xs font-semibold text-gray-600 dark:text-gray-300 border-b pb-2 mb-2">
                    <div className="w-1/3 text-left">Invested</div>
                    <div className="w-1/3 text-center">PNL</div>
                    <div className="w-1/3 text-right">Shares</div>
                  </div>

                  {/* VALUES */}
                  <div className="flex text-sm items-center">
                    <div className="w-1/3 text-left text-gray-700 dark:text-gray-300">
                      {(row.userPosition?.invested ?? 0) > 0
                        ? `$${truncateValue(row.userPosition?.invested, 2)}`
                        : "--"}
                    </div>

                    <div
                      className={`w-1/3 text-center font-semibold ${
                        pnl < 0 ? "text-red-500" : "text-emerald-500"
                      }`}
                    >
                      {pnl !== 0 ? `$${truncateValue(pnl, 2)}` : "--"}
                    </div>

                    <div className="w-1/3 text-right text-gray-700 dark:text-gray-300">
                      {(row.userPosition?.shares ?? 0) > 0
                        ? truncateValue(row.userPosition?.shares, 2)
                        : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ===================== END ===================== */}
          </div>
        );
      })}
    </div>
  );
}
