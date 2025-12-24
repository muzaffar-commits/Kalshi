"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { questionDetails } from "@/components/service/apiService/category";
import { useParams } from "next/navigation";
import ChartRealtime from "./realTimeChart";
import socket from "@/components/socket";
import BuySell from "@/components/Modal/BuySell/page";
import { getGraphData } from "@/components/service/apiService/buySell";
import { useSelector } from "react-redux";

interface MarketUpdate {
  questionId: number | string;
  prices: number[];
  q: number[];
  ts: number;
}

const Page = () => {
  const [orderFlow, setOrderFlow] = useState<{
    buys: any[];
    sells: any[];
  }>({
    buys: [],
    sells: [],
  });

  const [data, setData] = useState<any>({});
  const [graphData, setGraphData] = useState<any>({});
  const { slug } = useParams();
  const [isOpenBuySell, setIsOpenBuySell] = useState(false);
  const [buyType, setBuyType] = useState<any>(null);
  const [options, setOptions] = useState<any>({});
  const userDetails = useSelector((state: any) => state?.user);
  const useToken = localStorage.getItem("token");

  const questionDetailsList = async () => {
    try {
      const response: any = await questionDetails(slug, userDetails?.user?.id);

      if (response?.success) {
        setOrderFlow({
          buys: response?.data?.orderFlow?.buys || [],
          sells: response?.data?.orderFlow?.sells || [],
        });
        setData(response?.data || {});
      } else {
        setOrderFlow({ buys: [], sells: [] });
        setData({});
      }
    } catch (error: any) {
      setOrderFlow({ buys: [], sells: [] });
      setData({});
    }
  };
  const getGraphDetails = async () => {
    try {
      const response: any = await getGraphData(slug);

      if (response?.success) {
        setGraphData(response?.data || {});
      } else {
        setGraphData({});
      }
    } catch (error: any) {
      setGraphData({});
    }
  };

  // getGraphData
  useEffect(() => {
    questionDetailsList();
    getGraphDetails();
  }, [slug]);

  const processedOrderIdsRef = useRef<Set<number>>(new Set());
  const OrderHistoryIdsRef = useRef<Set<number>>(new Set());
  const questionId = slug;

  console.log(socket.connected, "socket.connected=====");
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected! ID:", socket.id);
      socket.emit("subscribe:market", questionId);
      if (userDetails?.user?.id) {
        socket.emit("subscribe:user", userDetails?.user?.id);
      }
    });

    socket.onAny((_, ...args) => {});
    socket.on("market:prices", (payload: any) => {
      console.log("MarketPrices received:", payload);
      if (!payload?.questionId || !Array.isArray(payload.prices)) {
        return;
      }

      setData((prev: any) => {
        if (!prev?.options || !Array.isArray(prev.options)) {
          return prev;
        }
        const updatedOptions = prev.options.map(
          (option: any, index: number) => {
            const newPrice = payload.prices[index];
            return {
              ...option,
              price:
                typeof newPrice === "number" && !isNaN(newPrice)
                  ? newPrice
                  : option.price,
              winningProbability:
                typeof newPrice === "number" && !isNaN(newPrice)
                  ? newPrice
                  : option.winningProbability,
            };
          }
        );

        return {
          ...prev,
          options: updatedOptions,
          lastPriceUpdatedAt: new Date(payload.ts || Date.now()).toISOString(),
        };
      });
    });

    socket.on("trade", (payload: any) => {
      console.log("Trade market", payload);

      const tradeRow = {
        id: payload.orderId,
        optionId: payload.optionId,
        shares: payload.filledShares.toFixed(16),
        saleAtPrice: (payload.cash / payload.filledShares).toFixed(16),
        createdAt: new Date(payload.ts).toISOString(),
      };
      if (OrderHistoryIdsRef.current.has(payload.orderId)) {
        return;
      }
      OrderHistoryIdsRef.current.add(payload.orderId);
      setOrderFlow((prev) => {
        if (!prev) return prev;

        if (payload.side === "BUY") {
          return {
            buys: [tradeRow, ...(prev.buys || [])],
            sells: prev.sells || [],
          };
        }

        if (payload.side === "SELL") {
          return {
            buys: prev.buys || [],
            sells: [tradeRow, ...(prev.sells || [])],
          };
        }

        return prev;
      });
    });

    socket.on("order:update", (payload: any) => {
      console.log(payload, "orderMarket======>123");

      if (
        !payload?.questionId ||
        !payload?.optionId ||
        typeof payload?.orderId !== "number" ||
        typeof payload?.filled !== "number"
      ) {
        return;
      }
      if (processedOrderIdsRef.current.has(payload.orderId)) {
        return;
      }
      processedOrderIdsRef.current.add(payload.orderId);
      setData((prev: any) => {
        if (!prev?.options || !Array.isArray(prev.options)) {
          return prev;
        }
        const updatedOptions = prev.options.map(
          (option: any, index: number) => {
            const newPrice = payload.prices?.[index];
            if (option.id === payload.optionId) {
              const prevShares = option.userPosition?.shares || 0;

              return {
                ...option,
                price:
                  typeof newPrice === "number" && !isNaN(newPrice)
                    ? newPrice
                    : option.price,

                winningProbability:
                  typeof newPrice === "number" && !isNaN(newPrice)
                    ? newPrice
                    : option.winningProbability,

                userPosition: {
                  ...option.userPosition,
                  shares:
                    payload.side == "BUY"
                      ? prevShares + payload.filled
                      : prevShares - payload.filled,
                },
              };
            }

            // OTHER OPTIONS → ONLY PRICE
            return {
              ...option,
              price:
                typeof newPrice === "number" && !isNaN(newPrice)
                  ? newPrice
                  : option.price,
              winningProbability:
                typeof newPrice === "number" && !isNaN(newPrice)
                  ? newPrice
                  : option.winningProbability,
            };
          }
        );

        return {
          ...prev,
          options: updatedOptions,
          lastOrderUpdatedAt: new Date().toISOString(),
        };
      });
    });

    // Error handling
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
    return () => {
      console.log("subscribing from market:", questionId);
      // socket.emit("unsubscribe:market", questionId);
      // socket.off("connect");
      // socket.off("market:prices");
      // socket.off("trade");
      // socket.off("order:update");
      socket.offAny();
    };
  }, [slug]);

  const handleBuyNow = (row: any, type: string) => {
    setOptions(row);
    setBuyType(type);
    setIsOpenBuySell(true);
  };

  console.log(orderFlow, "orderFlow");
  return (
    <>
      <div className="max-w-[1268px] mx-auto px-4 mt-24 lg:mt-28">
        <div className="container mx-auto p-3 lg:p-6">
          <div className="md:flex lg:items-center mb-6">
            <Image
              src="/img/blockimg1.jpg"
              alt="NYC Flag"
              width={80}
              height={80}
              className="mr-4 rounded-lg"
            />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-black">
                {data?.question?.question}
              </h1>
              <p className="text-sm text-[#7F90A7]">
                ₹ {Number(data?.market?.totalMarketVolume || 0).toFixed(2) || 0}{" "}
                Vol.
              </p>
              <div className="lg:flex space-x-4 mt-1 text-sm">
                {data?.options?.map((item: any, index: any) => (
                  <div key={index} className=" text-wrap items-center">
                    <span
                      className={`rounded-full ${
                        index === 0
                          ? "bg-red-700 "
                          : index === 1
                          ? "bg-blue-500 "
                          : index === 2
                          ? "bg-green-500 "
                          : index === 3
                          ? "bg-purple-600 "
                          : index === 4
                          ? "bg-yellow-700 "
                          : "bg-pink-500"
                      } inline-block mr-2`}
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                    <span className="text-[#7F90A7] font-semibold">
                      {item?.name || "--"}, {(item?.price * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {graphData?.series?.length > 0 ? (
                <div className=" h-64 mb-6 flex items-center justify-center">
                  <span className="text-gray-500">
                    <ChartRealtime
                      data={graphData?.series?.length > 0 && graphData?.series}
                    />
                  </span>
                </div>
              ) : (
                <div className="bg-cyan-100/80 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <span className="text-gray-500">[Chart Placeholder]</span>
                </div>
              )}

              {data?.options?.length > 0 && (
                <div className="md:flex   items-center justify-between text-center px-2 md:px-0 pt-3 md:py-0  font-bold !text-[#080b11]  md:border-0  lg:bg-transparent">
                  <div className="w-64 "></div>
                  {useToken && (
                    <>
                      <div className="!w-20 ">Invested</div>
                      <div className="!w-16 ">PnL</div>
                      <div className="!w-24">Buy Shares</div>{" "}
                    </>
                  )}
                  <div className="!w-40"></div>
                </div>
              )}
              <div className="flex flex-col  overflow-hidden  gap-0">
                {data?.options &&
                  data?.options?.map((item: any, index: any) => {
                    const pnl = Number(item?.userPosition?.pnl || 0);

                    return (
                      <div
                        key={index}
                        className="md:flex items-center lg:bg-transparent justify-between text-center  md:px-0  md:py-1 border !text-[#162033] rounded-lg border-[#334661] md:border-0  "
                      >
                        <div
                          className={`flex ${
                            useToken ? "w-64" : "w-full"
                          }  text-start    mb-3 lg:mb-0`}
                        >
                          {item?.name || "--"}
                        </div>
                        {useToken && (
                          <>
                            <div className="pr-1  !w-20">
                              {item?.userPosition?.invested > 0
                                ? `${Number(
                                    item?.userPosition?.invested || 0
                                  ).toFixed(1)}`
                                : "--"}
                            </div>
                            <div
                              className={`pr-1 !w-16 font-semibold ${
                                pnl < 0 ? "text-red-500" : "text-green-500"
                              }`}
                            >
                              {pnl != 0 ? `  ₹${pnl.toFixed(1)}` : "--"}
                            </div>
                            <div className="pr-1 !w-24 font-medium ">
                              {item?.userPosition?.shares > 0
                                ? `${Number(
                                    item?.userPosition?.shares || 0
                                  ).toFixed(2)}`
                                : "--"}
                            </div>
                          </>
                        )}
                        <div className="flex space-x-1 items-center justify-between">
                          <div className="pr-1">
                            {Number(item?.price * 100).toFixed(1)}%
                          </div>
                          <button
                            onClick={() => handleBuyNow(item, "sell")}
                            className="bg-red-700/40 text-red-600 w-50 lg:w-auto px-3 font-bold py-1 rounded"
                          >
                            Sell
                          </button>
                          <button
                            onClick={() => handleBuyNow(item, "buy")}
                            className="bg-green-600/40 text-green-500 w-50 lg:w-auto font-semibold px-3 py-1 rounded"
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="md:col-span-1  border border-[#334661] rounded-lg p-3 lg-p-6">
              <div className="flex justify-between pr-14 items-center ">
                <span className="text-lg font-semibold text-gray-900">
                  Shares
                </span>
                <span className="text-sm text-gray-500 ">Price</span>
              </div>

              <div className="mb-2">
                <span className="text-base p-0 font-bold text-green-600 mb-3 tracking-wide">
                  Buy Orders
                </span>
                <div className="max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                  {orderFlow?.buys?.length > 0 ? (
                    orderFlow.buys.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 px-4  hover:bg-gray-100 transition-colors "
                      >
                        <span className="text-gray-800 font-medium">
                          {Number(item?.shares)?.toFixed(2) || "0.00"}
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₹{Number(item?.saleAtPrice)?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400 text-sm ">
                      No buy orders yet
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-base font-bold text-red-600 mb-0 tracking-wide">
                  Sell Orders
                </span>
                <div className="max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                  {orderFlow?.sells?.length > 0 ? (
                    orderFlow.sells.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 px-4  hover:bg-gray-100 transition-colors "
                      >
                        <span className="text-gray-800 font-medium">
                          {Number(item?.shares)?.toFixed(2) || "0.00"}
                        </span>
                        <span className="text-red-600 font-semibold">
                          ₹{Number(item?.saleAtPrice)?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400 text-sm ">
                      No sell orders yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BuySell
        rowDetails={data}
        isOpen={isOpenBuySell}
        onClose={() => setIsOpenBuySell(false)}
        orderType={buyType}
        handleChangeOrderType={setBuyType}
        option={options}
        fetchDetail={questionDetailsList}
      />
    </>
  );
};

export default Page;
