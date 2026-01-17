import { truncateValue } from "@/utils/Content";
import { MdOpenInNew } from "react-icons/md";

type OrderSide = "BUY" | "SELL";

type OrderItem = {
  id: number;
  rank?: number;
  shares: number;
  side: OrderSide;
  maxCost?: number;
  minProceeds?: number;
};

interface OrderListProps {
  data: OrderItem[];
  cancelOrders: (orderId: number) => void;
}

export default function OrderList({ data, cancelOrders }: OrderListProps) {
  return (
    <div className="w-full rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#c3a66e]">
          <MdOpenInNew size={18} />
          Open Orders
        </h2>
      </div>

      <div className="grid grid-cols-5 px-4 py-3 text-[12px] font-semibold tracking-wide text-[#c3a66e] border-b border-white/10">
        <div>SHARES</div>
        <div>PRICE</div>
        <div>TYPE</div>
        <div className="text-right">STATUS</div>
        <div className="text-right">ACTION</div>
      </div>

      <div className="mt-2 space-y-2">
        {data.map((item) => {
          const isBuy = item.side === "BUY";
          return (
            <div
              key={item.id}
              className="
                grid grid-cols-5 items-center
                px-4 py-1.5
                rounded-xl
                bg-gray-200
                dark:bg-[#111a2e]
                border border-white/5
                dark:hover:bg-[#16203a]
                transition
              "
            >
              {/* Shares */}
              <div className="text-sm dark:text-white text-gray-700 font-medium">
                {truncateValue(Number(item?.shares || 0))}
              </div>

              {/* Price */}
              <div className="text-sm dark:text-white text-gray-700">
                {Number(isBuy ? item?.maxCost : item?.minProceeds || 0).toFixed(
                  2
                )}
              </div>

              {/* Type */}
              <div>
                <span
                  className={`
                    text-xs font-semibold px-3 py-1 rounded-md
                    ${
                      isBuy
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }
                  `}
                >
                  {item.side}
                </span>
              </div>

              {/* Status */}
              <div className="text-right">
                <span className="text-xs px-3 py-1 rounded-md bg-blue-500/20 text-blue-400">
                  Open
                </span>
              </div>

              {/* Action */}
              <div className="text-right">
                <button
                  onClick={() => cancelOrders(item.id)}
                  className="
                    text-xs font-semibold
                    px-4 py-1.5
                    rounded-md
                    bg-[#ff5b5b]
                    text-white
                    hover:bg-[#ff3b3b]
                    transition
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
