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
import GlobalLoader from "@/components/common/Loader";
import { ClassNames } from "@emotion/react";

const sellsssss = [
  {
    id: 112,
    userId: 2,
    optionId: 44,
    shares: "101.0000000000000000",
    saleAtPrice: "0.4045244275828439",
    createdAt: "2025-12-24T07:17:18.000Z",
  },
  {
    id: 111,
    userId: 2,
    optionId: 44,
    shares: "100.0000000000000000",
    saleAtPrice: "0.4289417255833655",
    createdAt: "2025-12-24T07:17:01.000Z",
  },
  {
    id: 108,
    userId: 3,
    optionId: 45,
    shares: "100.0000000000000000",
    saleAtPrice: "0.5715480061495828",
    createdAt: "2025-12-24T06:07:52.000Z",
  },
  {
    id: 106,
    userId: 3,
    optionId: 45,
    shares: "4.0000000000000000",
    saleAtPrice: "0.5597701613783670",
    createdAt: "2025-12-23T13:21:09.000Z",
  },
  {
    id: 105,
    userId: 3,
    optionId: 44,
    shares: "30.0000000000000000",
    saleAtPrice: "0.4434368697492649",
    createdAt: "2025-12-23T13:20:34.000Z",
  },
  {
    id: 104,
    userId: 3,
    optionId: 45,
    shares: "2.0000000000000000",
    saleAtPrice: "0.5531062841248513",
    createdAt: "2025-12-23T13:18:53.000Z",
  },
  {
    id: 103,
    userId: 3,
    optionId: 45,
    shares: "5.0000000000000000",
    saleAtPrice: "0.5539712280892672",
    createdAt: "2025-12-23T13:16:31.000Z",
  },
  {
    id: 100,
    userId: 2,
    optionId: 44,
    shares: "20.0000000000000000",
    saleAtPrice: "0.4473885568653714",
    createdAt: "2025-12-23T13:15:05.000Z",
  },
  {
    id: 95,
    userId: 3,
    optionId: 44,
    shares: "2.0000000000000000",
    saleAtPrice: "0.4414623271884466",
    createdAt: "2025-12-23T11:28:35.000Z",
  },
  {
    id: 94,
    userId: 3,
    optionId: 44,
    shares: "11.0000000000000000",
    saleAtPrice: "0.4430657951641230",
    createdAt: "2025-12-23T11:24:09.000Z",
  },
];

const bysssss = [
  {
    id: 110,
    userId: 2,
    optionId: 44,
    shares: "12.0000000000000000",
    saleAtPrice: "0.4397372011673231",
    createdAt: "2025-12-24T06:35:27.000Z",
  },
  {
    id: 109,
    userId: 3,
    optionId: 45,
    shares: "10.0000000000000000",
    saleAtPrice: "0.5605092062872472",
    createdAt: "2025-12-24T06:31:30.000Z",
  },
  {
    id: 107,
    userId: 3,
    optionId: 45,
    shares: "100.0000000000000000",
    saleAtPrice: "0.5715480061495828",
    createdAt: "2025-12-23T13:22:09.000Z",
  },
  {
    id: 102,
    userId: 3,
    optionId: 45,
    shares: "10.0000000000000000",
    saleAtPrice: "0.5533533451887933",
    createdAt: "2025-12-23T13:16:17.000Z",
  },
  {
    id: 101,
    userId: 2,
    optionId: 44,
    shares: "12.0000000000000000",
    saleAtPrice: "0.4463995636748829",
    createdAt: "2025-12-23T13:15:25.000Z",
  },
  {
    id: 99,
    userId: 2,
    optionId: 44,
    shares: "12.0000000000000000",
    saleAtPrice: "0.4483774113123218",
    createdAt: "2025-12-23T13:14:12.000Z",
  },
  {
    id: 98,
    userId: 2,
    optionId: 44,
    shares: "12.0000000000000000",
    saleAtPrice: "0.4454112718413701",
    createdAt: "2025-12-23T13:11:47.000Z",
  },
  {
    id: 97,
    userId: 2,
    optionId: 44,
    shares: "12.0000000000000000",
    saleAtPrice: "0.4424490157835900",
    createdAt: "2025-12-23T13:11:46.000Z",
  },
  {
    id: 96,
    userId: 3,
    optionId: 45,
    shares: "1.0000000000000000",
    saleAtPrice: "0.5589075038803912",
    createdAt: "2025-12-23T11:30:29.000Z",
  },
  {
    id: 91,
    userId: 3,
    optionId: 44,
    shares: "5.0000000000000000",
    saleAtPrice: "0.4482536204063308",
    createdAt: "2025-12-23T11:06:43.000Z",
  },
];

const datassssss = {
  question: {
    id: 14,
    question: "Will global social commerce sales exceed $2 trillion in 2026?",
    description: null,
    status: "OPEN",
    questionType: "MULTIPLE_CHOICE",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    createdAt: "2025-12-17T11:20:40.000Z",
  },
  options: [
    {
      id: 44,
      name: "Yes",
      index: 0,
      price: 0.3924013449403528,
      winningProbability: 0.3924013449403528,
      quantity: "363.4925596024841000",
      trading: {
        buyVolume: 1401.492559602484,
        sellVolume: 1038,
        totalVolume: 2439.492559602484,
      },
      userPosition: {
        shares: 273.4925596024841,
        invested: 440.00000775230524,
        currentValue: 107.31884821919436,
        pnl: -332.6811595331109,
      },
    },
    {
      id: 45,
      name: "No",
      index: 1,
      price: 0.6075986550596472,
      winningProbability: 0.6075986550596472,
      quantity: "800.7219616342336000",
      trading: {
        buyVolume: 1403.7219616342336,
        sellVolume: 603,
        totalVolume: 2006.7219616342336,
      },
      userPosition: {
        shares: 790.7219616342336,
        invested: 781.1576217589878,
        currentValue: 480.44160041508627,
        pnl: -300.71602134390156,
      },
    },
  ],
  market: {
    totalMarketVolume: 4446.214521236718,
  },
  user: {
    invested: 1221.1576295112932,
    currentValue: 587.7604486342807,
    pnl: -633.3971808770125,
    earningPercent: -51.86858482229667,
  },
  orderFlow: {
    buys: [
      {
        id: 110,
        userId: 2,
        optionId: 44,
        shares: "12.0000000000000000",
        saleAtPrice: "0.4397372011673231",
        createdAt: "2025-12-24T06:35:27.000Z",
      },
      {
        id: 109,
        userId: 3,
        optionId: 45,
        shares: "10.0000000000000000",
        saleAtPrice: "0.5605092062872472",
        createdAt: "2025-12-24T06:31:30.000Z",
      },
      {
        id: 107,
        userId: 3,
        optionId: 45,
        shares: "100.0000000000000000",
        saleAtPrice: "0.5715480061495828",
        createdAt: "2025-12-23T13:22:09.000Z",
      },
      {
        id: 102,
        userId: 3,
        optionId: 45,
        shares: "10.0000000000000000",
        saleAtPrice: "0.5533533451887933",
        createdAt: "2025-12-23T13:16:17.000Z",
      },
      {
        id: 101,
        userId: 2,
        optionId: 44,
        shares: "12.0000000000000000",
        saleAtPrice: "0.4463995636748829",
        createdAt: "2025-12-23T13:15:25.000Z",
      },
      {
        id: 99,
        userId: 2,
        optionId: 44,
        shares: "12.0000000000000000",
        saleAtPrice: "0.4483774113123218",
        createdAt: "2025-12-23T13:14:12.000Z",
      },
      {
        id: 98,
        userId: 2,
        optionId: 44,
        shares: "12.0000000000000000",
        saleAtPrice: "0.4454112718413701",
        createdAt: "2025-12-23T13:11:47.000Z",
      },
      {
        id: 97,
        userId: 2,
        optionId: 44,
        shares: "12.0000000000000000",
        saleAtPrice: "0.4424490157835900",
        createdAt: "2025-12-23T13:11:46.000Z",
      },
      {
        id: 96,
        userId: 3,
        optionId: 45,
        shares: "1.0000000000000000",
        saleAtPrice: "0.5589075038803912",
        createdAt: "2025-12-23T11:30:29.000Z",
      },
      {
        id: 91,
        userId: 3,
        optionId: 44,
        shares: "5.0000000000000000",
        saleAtPrice: "0.4482536204063308",
        createdAt: "2025-12-23T11:06:43.000Z",
      },
    ],
    sells: [
      {
        id: 112,
        userId: 2,
        optionId: 44,
        shares: "101.0000000000000000",
        saleAtPrice: "0.4045244275828439",
        createdAt: "2025-12-24T07:17:18.000Z",
      },
      {
        id: 111,
        userId: 2,
        optionId: 44,
        shares: "100.0000000000000000",
        saleAtPrice: "0.4289417255833655",
        createdAt: "2025-12-24T07:17:01.000Z",
      },
      {
        id: 108,
        userId: 3,
        optionId: 45,
        shares: "100.0000000000000000",
        saleAtPrice: "0.5715480061495828",
        createdAt: "2025-12-24T06:07:52.000Z",
      },
      {
        id: 106,
        userId: 3,
        optionId: 45,
        shares: "4.0000000000000000",
        saleAtPrice: "0.5597701613783670",
        createdAt: "2025-12-23T13:21:09.000Z",
      },
      {
        id: 105,
        userId: 3,
        optionId: 44,
        shares: "30.0000000000000000",
        saleAtPrice: "0.4434368697492649",
        createdAt: "2025-12-23T13:20:34.000Z",
      },
      {
        id: 104,
        userId: 3,
        optionId: 45,
        shares: "2.0000000000000000",
        saleAtPrice: "0.5531062841248513",
        createdAt: "2025-12-23T13:18:53.000Z",
      },
      {
        id: 103,
        userId: 3,
        optionId: 45,
        shares: "5.0000000000000000",
        saleAtPrice: "0.5539712280892672",
        createdAt: "2025-12-23T13:16:31.000Z",
      },
      {
        id: 100,
        userId: 2,
        optionId: 44,
        shares: "20.0000000000000000",
        saleAtPrice: "0.4473885568653714",
        createdAt: "2025-12-23T13:15:05.000Z",
      },
      {
        id: 95,
        userId: 3,
        optionId: 44,
        shares: "2.0000000000000000",
        saleAtPrice: "0.4414623271884466",
        createdAt: "2025-12-23T11:28:35.000Z",
      },
      {
        id: 94,
        userId: 3,
        optionId: 44,
        shares: "11.0000000000000000",
        saleAtPrice: "0.4430657951641230",
        createdAt: "2025-12-23T11:24:09.000Z",
      },
    ],
  },
};
const Page = () => {
  const [orderFlow, setOrderFlow] = useState<{
    buys: any[];
    sells: any[];
  }>({
    buys: bysssss || [],
    sells: sellsssss || [],
  });
  const [isLoader, setIsLoader] = useState<any>(false);
  const [data, setData] = useState<any>(datassssss || {});
  const [graphData, setGraphData] = useState<any>({});
  const { slug } = useParams();
  const [isOpenBuySell, setIsOpenBuySell] = useState(false);
  const [buyType, setBuyType] = useState<any>(null);
  const [options, setOptions] = useState<any>({});
  const userDetails = useSelector((state: any) => state?.user);
  const useToken = localStorage.getItem("token");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const questionDetailsList = async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        questionDetails(slug, userDetails?.user?.id),
        delay(2000), // ⏱️ minimum loader time
      ]);

      if (response?.success) {
        // setOrderFlow({
        //   buys: response?.data?.orderFlow?.buys || [],
        //   sells: response?.data?.orderFlow?.sells || [],
        // });
        // setData(response?.data || {});
      } else {
        // setOrderFlow({ buys: [], sells: [] });
        // setData({});
      }
    } catch (error: any) {
      // setOrderFlow({ buys: [], sells: [] });
      // setData({});
    } finally {
      setIsLoader(false);
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
      {false && <GlobalLoader />}
      <div className="dark:bg-[#0f172a]">
      <div className="max-w-[1268px] mx-auto px-4 mt-24 lg:mt-28 ">
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
              <h1 className="text-xl lg:text-2xl font-bold text-black dark:text-white">
                {data?.question?.question}
              </h1>
              <p className="text-sm text-[#7F90A7] dark:text-gray-300">
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
                    <span className="text-[#7F90A7] font-semibold dark:text-gray-300">
                      {item?.name || "--"}, {(item?.price * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {graphData?.series?.length> 0 ? (
                <div className=" h-64 mb-6 flex">
                  <span className="text-gray-500 ">
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
                <div className="md:flex items-center justify-between text-center px-2 md:px-0 pt-3 md:py-0  font-bold !text-[#080b11] md:border-0 lg:bg-transparent">
                  <div className="w-64"></div>
                  {useToken && (
                    <>
                      <div className="!w-20">Invested</div>
                      <div className="!w-16">PnL</div>
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
                        className="md:flex items-center lg:bg-transparent justify-between text-center  md:px-0 md:py-1 border text-[#162033] dark:text-gray-100 rounded-lg border-[#334661] md:border-0 mb-2">
                        <div
                          className={`flex ${
                            useToken ? "w-64" : "w-full"
                          }  text-start mb-3 lg:mb-0`}
                        >
                          {item?.name || "--"}
                        </div>
                        {useToken && (
                          <>
                            <div className="pr-1 !w-20">
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
                            className="bg-[#0099FF]/40 text-blue-500 w-50 cursor-pointer lg:w-auto px-3 font-bold py-1 rounded">
                            Sell
                          </button>
                          <button
                            onClick={() => handleBuyNow(item, "buy")}
                            className="bg-cyan-600/30 text-[#0099ff] cursor-pointer w-50 lg:w-auto font-semibold px-3 py-1 rounded"
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="md:col-span-1 border border-gray-200 dark:border-gray-700 rounded-lg p-3 lg-p-6">
              <div className="flex justify-between pr-14 items-center ">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Shares
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-200">Price</span>
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
                        className="flex justify-between items-center py-1 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 transition-colors border-b border-b-white dark:border-b-gray-600"
                      >
                        <span className="text-gray-500 font-medium dark:text-gray-100">
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

              <div className="">
                <span className="text-base font-bold text-red-600 tracking-wide bg-red-600/15 block px-2 mb-3">
                  Sell Orders
                </span>
                <div className="max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                  {orderFlow?.sells?.length > 0 ? (
                    orderFlow.sells.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 transition-colors border-b border-b-white dark:border-b-gray-600"
                      >
                        <span className="text-gray-500 font-medium dark:text-gray-200">
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

              <div className="dark:bg-[#151922] bg-gray-100/50 mt-2 w-full rounded-md overflow-hidden border dark:border-[#1c1f26] border-[#d6d6d6]">
    

    <div className="divide-y dark:divide-[#1c1f26] divide-[#d6d6d6]">
  
      <div className="relative flex justify-between px-2 py-1 text-sm text-red-400 font-medium">
        <div className="absolute right-0 top-0 h-full bg-red-500 opacity-10 z-0" style={{ width: '80%' }}></div>
        <span className="z-10">29484.1</span>
        <span className="z-10">2.44224615</span>
      </div>

      <div className="relative flex justify-between px-2 py-1 text-sm text-red-400 font-medium">
        <div className="absolute right-0 top-0 h-full bg-red-500 opacity-10 z-0" style={{ width: '10%' }}></div>
        <span className="z-10">29483.1</span>
        <span className="z-10">0.02900000</span>
      </div>

      <div className="relative flex justify-between px-2 py-1 text-sm text-red-400 font-medium">
        <div className="absolute right-0 top-0 h-full bg-red-500 opacity-10 z-0" style={{ width: '30%' }}></div>
        <span className="z-10">29482.2</span>
        <span className="z-10">2.59239545</span>
      </div>

    
    </div>

 
    <div className="text-center dark:text-white text-black font-bold py-2 text-base border-y dark:border-[#1c1f26] border-[#d6d6d6]">
      29481.3 USD <span className="text-green-500 text-xs align-top">▲</span>
    </div>

   
    <div className="divide-y dark:divide-[#2e3139] divide-[#d6d6d6]">
      <div className="relative flex justify-between px-2 py-1 text-sm text-green-400 font-medium">
        <div className="absolute left-0 top-0 h-full bg-green-500 opacity-10 z-0" style={{ width: '30%' }}></div>
        <span className="z-10">29481.2</span>
        <span className="z-10">0.34533991</span>
      </div>

      <div className="relative flex justify-between px-2 py-1 text-sm text-green-400 font-medium">
        <div className="absolute left-0 top-0 h-full bg-green-500 opacity-10 z-0" style={{ width: '10%' }}></div>
        <span className="z-10">29481.0</span>
        <span className="z-10">0.06784030</span>
      </div>

      <div className="relative flex justify-between px-2 py-1 text-sm text-green-400 font-medium">
        <div className="absolute left-0 top-0 h-full bg-green-500 opacity-10 z-0" style={{ width: '70%' }}></div>
        <span className="z-10">29475.0</span>
        <span className="z-10">2.79452092</span>
      </div>

     
    </div>

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
        // fetchDetail={questionDetailsList}
      />
    </>
  );
};

export default Page;
