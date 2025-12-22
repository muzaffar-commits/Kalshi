"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { questionDetails } from "@/components/service/apiService/category";
import { useParams } from "next/navigation";
import ChartRealtime from "./realTimeChart";
import socket from "@/components/socket";
import BuySell from "@/components/Modal/BuySell/page";
import { getGraphData } from "@/components/service/apiService/buySell";
import { useSelector } from "react-redux";

const Page = () => {
  const [orderFlow, setOrderFlow] = useState<any>({});
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
        setOrderFlow(response?.data?.orderFlow || {});
        setData(response?.data || {});
      } else {
        setOrderFlow({});
        setData({});
      }
    } catch (error: any) {
      setOrderFlow({});
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

  const questionId = slug;

  useEffect(() => {
    console.log(socket.connected, "socket.connected)");

    if (!socket.connected) {
      socket.connect();
    }

    // Connection success
    socket.on("connect", () => {
      console.log("✅ Socket connected! ID:", socket.id);
      // Subscribe to the market room
      socket.emit("subscribe:market", questionId);
      socket.emit("subscribe:user", questionId);
      console.log("Subscribed to market:", questionId);
    });

    // Catch ALL incoming events from server (super important!)
    socket.onAny((eventName, ...args) => {
      console.log("🔥 SERVER SENT EVENT:", eventName);
      console.log("Data:", JSON.stringify(args, null, 2));
    });

    // Listen to events that backend is actually emitting
    socket.on("market:prices", (payload) => {
      console.log("📈 Market prices received:", payload);
      // Yahan tum state update kar sakte ho, e.g. setMarketData(payload)
    });

    socket.on("trade", (payload) => {
      console.log("🛒 Trade update received:", payload);

      // Handle both string and object payloads safely
      let parsed: any;
      try {
        parsed = JSON.stringify(data);
      } catch (e) {
        console.error("Failed to parse trade payload:", e, payload);
        return; // Don't update state on invalid payload
      }

      console.log(parsed?.questionId, parsed.prices, "parsed.prices====");
      console.log(
        typeof parsed?.questionId,
        typeof parsed.prices,
        "parsed.prices====>>>>>>>>"
      );

      console.log(
        !parsed?.questionId,
        !Array.isArray(parsed.prices),
        !Array.isArray(parsed.q),
        "parsed"
      );
      if (
        !parsed?.questionId ||
        !Array.isArray(parsed.prices) ||
        !Array.isArray(parsed.q)
      ) {
        console.warn("Invalid trade payload structure:", parsed);
        return;
      }

      console.log(parsed, "parsed");

      setData((prev: any) => {
        // If no previous data yet, skip or initialize (depending on your app logic)
        if (!prev || !prev.options || !Array.isArray(prev.options)) {
          console.warn("No previous market data available yet");
          return prev; // or return initial state if you have one
        }

        // Create a new options array with updated values
        const updatedOptions = prev.options.map((option: any, index: any) => {
          const newPrice = parsed.prices?.[index];
          const newQty = parsed.q?.[index];

          // Only update if we have valid numbers
          const updatedPrice =
            typeof newPrice === "number" && !isNaN(newPrice)
              ? newPrice
              : option.price;

          const updatedQty =
            typeof newQty === "number" && !isNaN(newQty)
              ? newQty
              : option.quantity;

          return {
            ...option,
            price: updatedPrice,
            winningProbability: updatedPrice, // usually same as price in prediction markets
            quantity: updatedQty,
          };
        });

        // Return new state object to trigger re-render
        return {
          ...prev,
          options: updatedOptions,
          // Optional: update timestamp or other fields
          lastUpdated: new Date().toISOString(),
        };
      });
    });

    // If you also need user-specific order updates
    socket.on("order:update", (payload) => {
      console.log("Order update received:-----------", payload);
    });

    // Error handling
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
    return () => {
      console.log("Unsubscribing from market:", questionId);
      // socket.emit("unsubscribe:market", questionId);
      socket.off("connect");
      socket.off("market:prices");
      socket.off("trade");
      socket.off("order:update");
      socket.offAny();
    };
  }, [slug]);

  const handleBuyNow = (row: any, type: string) => {
    setOptions(row);
    setBuyType(type);
    setIsOpenBuySell(true);
  };

  console.log(data, "data");
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
                ${data?.market?.totalMarketVolume || 0} Vol.
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
                  <div className="w-40"></div>
                  {useToken && (
                    <>
                      <div className="!w-16">Invested</div>
                      <div className="!w-10 ">PnL</div>
                      <div className="!w-24">Buy Shares</div>{" "}
                    </>
                  )}
                  <div className="!w-40"></div>
                </div>
              )}
              <div className="flex flex-col  overflow-hidden  gap-1">
                {data?.options &&
                  data?.options?.map((item: any, index: any) => {
                    const pnl = Number(item?.userPosition?.pnl || 0);

                    return (
                      <div
                        key={index}
                        className="md:flex items-center lg:bg-transparent justify-between text-center  md:px-0  md:py-1 border !text-[#162033] rounded-lg border-[#334661] md:border-0  "
                      >
                        <div className="flex !w-40  items-center  justify-start mb-3 lg:mb-0">
                          {item?.name || "--"}
                        </div>
                        {useToken && (
                          <>
                            <div className="pr-1  !w-16">
                              {item?.userPosition?.invested > 0
                                ? `${Number(
                                    item?.userPosition?.invested || 0
                                  ).toFixed(1)}`
                                : "--"}
                            </div>
                            <div
                              className={`pr-1 !w-10 font-semibold ${
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
        userId={userDetails?.user?.id}
      />
    </>
  );
};

export default Page;
