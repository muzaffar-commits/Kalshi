import React, { useState } from "react";
import SubList from "./components/SubList/page";
import { FaFootballBall } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import play from "../../../../public/img/play.png";
import game2 from "../../../../public/img/blockimg2.jpg";
import FilterDropdown from "./components/CogDropdown/page";
import LimitDropdown from "./components/LimitDropdown/page";
import Image from "next/image";
import {
  OptionItem,
  QuestionItem,
  QuestionItemSecond,
} from "@/utils/typesInterface";
import { useRouter } from "next/navigation";
import BuySell from "./components/BuyShell/page";
export default function SubCategory({
  eventSubCategoryId,
  setEventSubCategoryId,
  questionData,
  handleBuyNow,
}: {
  eventSubCategoryId: number | null;
  setEventSubCategoryId: (id: number | null) => void;
  questionData: QuestionItem[];
  handleBuyNow: (
    row: QuestionItemSecond,
    item: OptionItem,
    type: string,
    idx: number,
  ) => void;
}) {
  const [buyType, setBuyType] = useState<string>("buy");
  const [options, setOptions] = useState<OptionItem | null>(null);

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionItemSecond | null>(null);
  const router = useRouter();

  const goToDetails = (userId: string) => {
    router.push(`/Detail?id=${userId}`);
  };
  const handleSelectedQuestion = (
    row: QuestionItemSecond | null,
    option,
    idx,
  ) => {
    setSelectedQuestion(row);
    setOptions(option);
    // handleBuyNow(row, option, "buy", idx);
  };
  return (
    <>
      <div className="dark:bg-[#0f172a]  bg-white text-gray-800 dark:text-gray-200 min-h-screen">
        <div className="max-w-[1268px] mx-auto px-4 pb-16  ">
          <div className="md:flex justify-between">
            <div className="md:w-[12%]  md:sticky md:top-28 h-fit">
              <SubList
                eventSubCategoryId={eventSubCategoryId}
                setEventSubCategoryId={setEventSubCategoryId}
              />
            </div>
            <div className="md:w-[54%] md:ml-[2%]">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h1 className="text-xl md:text-xl font-bold dark:text-gray-300 text-gray-700">
                    Sports
                  </h1>
                </div>

                <div>
                  <FilterDropdown />
                </div>
              </div>

              {questionData?.length > 0 &&
                questionData?.map((row) => (
                  <div className="border border-gray-200 dark:border-gray-700 dark:hover:border-[#c9ae79]/50 hover:border-gray-400 p-3 rounded-lg mb-3">
                    <p
                      className="text-gray-400 cursor-pointer hover:text-gray-200 text-sm mb-4"
                      onClick={() => goToDetails(row?.id)}
                    >
                      <FaFootballBall className="inline-block" />{" "}
                      {row?.question || ""}
                    </p>
                    {row?.options?.length > 0 &&
                      row?.options?.map((item, idx: number) => (
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-[16px] dark:text-gray-300 text-gray-800 flex items-center gap-1 min-w-0">
                            <Image
                              src={play}
                              alt="Play Icon"
                              width={20}
                              height={20}
                              className="inline-block"
                            />
                            <span className="block truncate w-[180px] md:w-full">
                              {item?.name || "--"}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                handleSelectedQuestion(row, item, idx)
                              }
                              className="py-1 px-4 border dark:border-[#c7ac77]/80 cursor-pointer border-gray-600 dark:text-[#c7ac77] text-gray-700 font-semibold rounded-md text-md"
                            >
                              {item?.price * 100} %
                            </button>
                          </div>
                        </div>
                      ))}

                    <span className="text-gray-500 text-xs">
                      Jan 19 @ 6:35am EST
                    </span>
                  </div>
                ))}
            </div>
            <div className="md:w-[30%] md:sticky md:top-28 h-fit">
              {/* <div className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg mb-3">
                <div className="flex justify-between gap-2">
                  <div>
                    <Image
                      src={game2}
                      alt="Play Icon"
                      width={60}
                      height={60}
                      className="inline-block rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] dark:text-gray-400">
                      Beijing Royal Fighters at Guangzhou Loong Lions
                    </p>
                    <p className="text-sm font-semibold">
                      <span className="dark:text-[#d1b37f] text-gray-800">
                        Buy Yes
                      </span>{" "}
                      · Beijing Royal Fighters
                    </p>
                  </div>
                </div>
                <div className="flex justify-between md:mt-5 mt-4 items-center">
                  <div className="flex gap-2">
                    <button className="py-1 px-4 border dark:bg-[#c7ac77]/50 bg-gray-800 cursor-pointer dark:text-gray-950 text-gray-200 font-semibold rounded-md text-sm hover:bg-[#c7ac77]">
                      Buy
                    </button>
                    <button className="py-1 px-4 border dark:border-[#c7ac77]/50 cursor-pointer border-gray-600 dark:text-[#c7ac77] text-gray-700 font-semibold rounded-md text-sm">
                      Sell
                    </button>
                  </div>
                  <div>
                    <LimitDropdown />
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="w-full py-2 px-4 border dark:bg-[#c7ac77]/80 bg-gray-600 cursor-pointer dark:text-gray-800 text-gray-200 font-semibold rounded-md text-md dark:hover:bg-[#c7ac77]/60 hover:bg-gray-700/70">
                    Yes $0.5
                  </button>

                  <button className="w-full py-2 px-4 dark:bg-[#c7ac77]/30 bg-gray-700/20 text-gray-800 cursor-pointer dark:text-[#c7ac77]  font-semibold rounded-md text-md dark:hover:bg-[#c7ac77]/50 hover:bg-gray-700/40">
                    No $1
                  </button>
                </div>
                <div className="border border-gray-200 dark:border-gray-700  p-3 rounded-md md:mt-7 flex justify-between items-center my-2">
                  <div>
                    <p className="dark:text-gray-400 text-gray-700 text-sm mb-2">
                      Contracts
                    </p>
                    <p className="dark:text-[#c7ac77] text-gray-700 text-[12px]">
                      Earn 3.5% Interest
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl dark:text-gray-300 text-gray-900">
                      0
                    </p>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700  p-3 rounded-md md:mt-3 flex justify-between items-center my-2">
                  <div>
                    <p className="dark:text-[#c7ac77] text-gray-700 text-[12px]">
                      Limit price{" "}
                      <FaExclamationCircle className="inline-block" />
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl dark:text-gray-300 text-gray-900">
                      0
                    </p>
                  </div>
                </div>
                <div className="text-center my-3">
                  <button className="w-full py-2 px-4 dark:bg-[#c7ac77]/30 bg-gray-700/20 text-gray-800 cursor-pointer dark:text-[#c7ac77]  font-semibold rounded-md text-md dark:hover:bg-[#c7ac77]/50 hover:bg-gray-700/40">
                    Sign up to trade
                  </button>
                </div>
              </div> */}
              <BuySell
                rowDetailss={selectedQuestion as null}
                handleChangeOrderType={setBuyType}
                option={options}
                optionIndex={1}
                orderType={buyType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
