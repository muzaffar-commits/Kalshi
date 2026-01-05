"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Authentication from "@/components/Pages/auth";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { useSelector } from "react-redux";
import ModalWithTabs from "@/components/Modal/BuySell/page";
import LoadingCard from "@/components/common/LoadingCard";
import BuySell from "@/components/Modal/BuySell/page";

const datassssss = [
  {
    id: 14,
    question: "Will global social commerce sales exceed $2 trillion in 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "OPEN",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 44,
        name: "Yes",
        price: 0.3924013449403528,
        quantity: "363.4925596024841000",
        trading: {
          buyVolume: 1401.492559602484,
          sellVolume: 1038,
          totalVolume: 2439.492559602484,
        },
      },
      {
        id: 45,
        name: "No",
        price: 0.6075986550596472,
        quantity: "800.7219616342336000",
        trading: {
          buyVolume: 1403.7219616342336,
          sellVolume: 603,
          totalVolume: 2006.7219616342336,
        },
      },
    ],
    stats: {
      buyVolume: 2805.2145212367177,
      sellVolume: 1641,
      totalVolume: 4446.214521236718,
    },
    user: null,
  },
  {
    id: 13,
    question:
      "Who will have the most followers on TikTok on December 31, 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 39,
        name: "Khaby Lame",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 40,
        name: "Charli D'Amelio",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 41,
        name: "MrBeast",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 42,
        name: "Addison Rae",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 43,
        name: "Someone else",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 12,
    question:
      "Will TikTok be effectively banned or unavailable for most US users by end of 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 36,
        name: "Yes",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 37,
        name: "No",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 38,
        name: "Partial restriction only",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 11,
    question:
      "Will TikTok be effectively banned or unavailable for most US users by end of 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 33,
        name: "Yes",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 34,
        name: "No",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 35,
        name: "Partial restriction only",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 10,
    question:
      "Will the Supreme Court uphold President Trump's reciprocal tariffs in its 2026 ruling?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 30,
        name: "Yes",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 31,
        name: "No",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 32,
        name: "Case dismissed/no ruling",
        price: 0.3333333333333333,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 9,
    question:
      "Will a formal ceasefire be signed in the Russia-Ukraine war by end of 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 28,
        name: "Yes",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 29,
        name: "No",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 8,
    question:
      "Who will be confirmed as U.S. Secretary of the Treasury in 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 24,
        name: "Scott Bessent",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 25,
        name: "John Paulson",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 26,
        name: "Howard Lutnick",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 27,
        name: "Someone else",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 7,
    question: "Who will Trump nominate as the next Fed Chair?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 20,
        name: "Kevin Warsh",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 21,
        name: "Kevin Hassett",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 22,
        name: "Jerome Powell (re-nominated)",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 23,
        name: "Someone else",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 6,
    question: "Who will Trump nominate as the next Fed Chair?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 16,
        name: "Kevin Warsh",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 17,
        name: "Kevin Hassett",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 18,
        name: "Jerome Powell (re-nominated)",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 19,
        name: "Someone else",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 5,
    question: "What will Bitcoin's closing price be on December 31, 2025?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 12,
        name: "Below $100,000",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 13,
        name: "Between $100,000 and $150,000",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 14,
        name: "Between $150,000 and $200,000",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 15,
        name: "Above $200,000",
        price: 0.25,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 4,
    question: "Which game will win Game of the Year at The Game Awards 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 7,
        name: "Grand Theft Auto VI",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 8,
        name: "The Legend of Zelda: Tears of the Kingdom sequel",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 9,
        name: "Elder Scrolls VI",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 10,
        name: "Dragon Age: The Veilguard sequel",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 11,
        name: "Other / None of the above",
        price: 0.2,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 3,
    question: "Which game will win Game of the Year at The Game Awards 2026?",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 5,
        name: "100k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 6,
        name: "105k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 2,
    question: "What is the next price of bitcoin",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 3,
        name: "100k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 4,
        name: "105k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
  {
    id: 1,
    question: "What is the next price of bitcoin",
    questionType: "MULTIPLE_CHOICE",
    status: "draft",
    liquidity: "1000.00000000",
    endDate: "1970-01-21T08:52:05.000Z",
    options: [
      {
        id: 1,
        name: "100k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
      {
        id: 2,
        name: "105k",
        price: 0.5,
        quantity: "0.0000000000000000",
        trading: {
          buyVolume: 0,
          sellVolume: 0,
          totalVolume: 0,
        },
      },
    ],
    stats: {
      buyVolume: 0,
      sellVolume: 0,
      totalVolume: 0,
    },
    user: null,
  },
];
const Blocks = () => {
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState(datassssss || []);
  const [buyType, setBuyType] = useState<any>(null);
  const [options, setOptions] = useState<any>({});
  const [rowDetails, setRowDetails] = useState<any>({});
  const getToken = localStorage.getItem("token");
  const categoryDetails = useSelector(
    (state: any) => state?.category?.category
  );
  const questionAllList = async () => {
    // setLoader(true);
    try {
      const response = await commonQuestionFindById(categoryDetails?.id || 1);

      if (response?.success) {
        // setQuestionData(response?.data?.questions || []);
      } else {
        // setQuestionData([]);
      }
    } catch (error: any) {
      console.log(error, "error");

      // setQuestionData([]);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    questionAllList();
  }, [categoryDetails?.id]);

  const handleBuyNow = (row: any, item: any, type: string) => {
    if (!getToken) {
      setIsOpen(true);
      return;
    }
    setRowDetails(row);
    setOptions(item);
    setBuyType(type);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="max-w-[1268px]  mx-auto px-4 pb-10 mt-20 lg:mt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 lg:pt-0 relative overflow-visible">
          {loader
            ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((row) => <LoadingCard key={row} />)
            : questionData?.map((row: any, index) => (
<div
  key={index}
  className="z-10 border border-gray-200 dark:border-gray-700 dark:bg-[#162033] 
    relative min-h-48 rounded-xl p-4 
    transition-transform duration-300 ease-in-out 
    transform hover:scale-110 hover:shadow-md hover:z-50">
                 <div className="flex items-center mb-3">
                    <Image
                      src="/img/blockimg1.jpg"
                      width={40}
                      height={40}
                      alt="trending"
                      className="mr-2 rounded"
                    />
                    <h2 className="font-semibold text-sm dark:text-white text-gray-800">
                      <Link href={`/detail/${row?.id}`}>
                        <div className="block">
                          <div
                            className="line-clamp-2"
                            title={row?.question || "--"}
                          >
                            {row?.question || "--"}
                          </div>
                        </div>
                      </Link>
                    </h2>
                  </div>

                  <div className="text-xs mt-4 mb-5 h-24 overflow-y-auto space-y-2 custom-scroll">
                    {row?.options?.map((item: any, idx: any) => (
                      <div
                        key={idx}
                        className="flex gap-2 justify-between items-center dark:text-white text-gray-700"
                      >
                        <span className="block max-w-full truncate">
                          {item?.name || "--"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span>{(item?.price * 100).toFixed(1)}%</span>
                          <button
                            onClick={() => handleBuyNow(row, item, "sell")}
                            className="py-1 px-2 bg-[#0099FF]/40 text-white font-semibold rounded-xs text-[10px]"
                          >
                            Sell
                          </button>
                          <button
                            onClick={() => handleBuyNow(row, item, "buy")}
                            className="py-1 px-2 bg-cyan-600/30 text-[#0099ff] font-semibold rounded-xs text-[10px]"
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex absolute mt-5 bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
                    <span>
                      ₹ {Number(row?.stats?.totalVolume || 0)?.toFixed(2) || 0}
                    </span>
                    <span>
                      <a href="#" onClick={() => setIsOpen(true)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </a>
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Authentication
        isLogin
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      {/* <ModalWithTabs
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      <BuySell
        rowDetails={rowDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderType={buyType}
        handleChangeOrderType={setBuyType}
        option={options}
      />
    </>
  );
};
export default Blocks;
