import CustomPagination from "@/components/common/CustomPagination";
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
  triggerPrice?: number;
  tpslLeg?: string;
};

interface OrderListProps {
  data: OrderItem[];
  cancelOrders: (orderId: number) => void;

  page: number;
  setOrderPage: (orderId: number) => void;
  orderPageResponse: any;
}

export default function OrderList({
  data,
  cancelOrders,
  page,
  setOrderPage,
  orderPageResponse,
}: OrderListProps) {
  console.log(page, orderPageResponse, "page");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setOrderPage(value);
  };
  return (
    <div className="w-full rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#c3a66e]">
          <MdOpenInNew size={18} />
          Open Orders
        </h2>
      </div>

      <div className="grid grid-cols-5 px-2 sm:px-4 py-3 text-[12px] font-semibold tracking-wide text-[#c3a66e] border-b border-white/10">
        <div>SHARES</div>
        <div>PRICE</div>
        <div>TYPE</div>
        <div className="text-right">STATUS</div>
        <div className="text-right">ACTION</div>
      </div>

      <div className="mt-2 space-y-1.5 sm:space-y-2">
        {data.map((item) => {
          const isBuy = item.side === "BUY";
          const isTpsl = item.tpslLeg === "TP_OR_SL";
          return (
            <div
              key={item.id}
              className="
                grid grid-cols-5 items-center
                px-4 py-1.5
                rounded-xl
                bg-gray-100
                dark:bg-[#2e3c4e]/10
                border border-white/5
                dark:hover:bg-[#27364b]
                transition
              "
            >
              {/* Shares */}
              <div className="text-sm dark:text-white text-gray-700 font-medium">
                {truncateValue(Number(item?.shares || 0))}
              </div>

              {/* Price */}
              <div className="text-sm dark:text-white text-gray-700">
                {truncateValue(
                  Number(
                    isTpsl
                      ? item?.triggerPrice
                      : isBuy
                        ? item?.maxCost
                        : item?.minProceeds || 0,
                  ),
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
                <span className="text-xs px-3 py-1 rounded-md bg-blue-500/10 text-blue-600">
                  Open
                </span>
              </div>

              {/* Action */}
              <div className="text-right">
                <button
                  onClick={() => cancelOrders(item.id)}
                  className="
                    px-3 cursor-pointer rounded-xl py-1 text-xs font-bold
      bg-red-500 text-white
      transition-all duration-150 ease-in-out
            shadow-[0_3px_0_rgba(239,68,68,0.5)]
            hover:bg-red-600
            active:translate-y-[2px]
            active:shadow-[0_2px_0_rgba(239,68,68,0.5)]
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <CustomPagination
        // count={17}
        count={orderPageResponse?.totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
