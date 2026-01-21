"use client";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Authentication from "@/components/Pages/auth";
import { useSelector } from "react-redux";
import LoadingCard from "@/components/common/LoadingCard";
import BuySell from "@/components/Modal/BuySell/page";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { useRouter } from "next/navigation";
import { FaRegBookmark } from "react-icons/fa";

import {
  OptionItem,
  QuestionItem,
  QuestionItemSecond,
  RootState,
} from "@/utils/typesInterface";
import { delay } from "@/utils/Content";

interface selectedSubCategory {
  category: {
    selectSubCategory: {
      id: number;
      isActive: Boolean;
      name: String;
      slug: String;
    };
  };
}

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
  const [buyType, setBuyType] = useState<string | null>(null);
  const [options, setOptions] = useState<OptionItem | null>(null);
  const [rowDetails, setRowDetails] = useState<QuestionItemSecond | null>(null);
  const [optionIndex, setOptionIndex] = useState<number | null>(null);
  const getToken = localStorage.getItem("token");
  const router = useRouter();
  const categoryDetails = useSelector(
    (state: RootState) => state?.category?.category,
  );
  const selectedSubCategory = useSelector(
    (state: selectedSubCategory) => state?.category?.selectSubCategory,
  );

  const userDetails = useSelector((state: RootState) => state?.user);

  console.log(selectedSubCategory, "selectedSubCategory");

  const questionAllList = useCallback(async () => {
    setLoader(true);
    try {
      const [response] = await Promise.all([
        commonQuestionFindById(
          categoryDetails?.id || 1,
          userDetails?.user?.id as string,
        ),
        delay(1000),
      ]);

      if (response?.success) {
        setQuestionData(response.data.questions ?? []);
      } else {
        setQuestionData([]);
      }
    } catch {
      setQuestionData([]);
    } finally {
      setLoader(false);
    }
  }, [categoryDetails?.id, userDetails?.user?.id]);

  useEffect(() => {
    questionAllList();
  }, [questionAllList]);

  const handleBuyNow = (
    row: QuestionItemSecond,
    item: OptionItem,
    type: string,
    idx: number,
  ) => {
    if (!getToken) {
      setIsOpen(true);
      return;
    }
    setOptionIndex(idx);
    setRowDetails(row);
    setOptions(item);
    setBuyType(type);
    setIsModalOpen(true);
  };

  const goToDetails = (userId: string) => {
    router.push(`/Detail?id=${userId}`);
  };

  const goToSubCategory = () => {
    router.push(`/subCategory`);
  };

  return (
    <>
      <div
        className={`max-w-[1268px]  mx-auto px-4 pb-10 mt-20 lg:mt-48 ${selectedSubCategory == null ? "lg:mt-36" : "lg:mt-36"}`}
      >
        {/* <div onClick={goToSubCategory}>goToSubCategory</div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 lg:pt-0">
          {loader ? (
            [1, 2, 3, 4, 5, 6, 7, 8]?.map((row) => <LoadingCard key={row} />)
          ) : questionData && questionData.length > 0 ? (
            questionData?.map((row: QuestionItem, index) => (
              <div
                key={index}
                className="z-10 border border-gray-200 dark:border-gray-700 dark:bg-[#162033] 
                  relative min-h-48 rounded-xl p-4 
                  transition-transform duration-300 ease-in-out 
                  transform hover:scale-105 hover:shadow-md "
              >
                <div className="flex items-center mb-3">
                  <Image
                    src="/img/blockimg1.jpg"
                    width={40}
                    height={40}
                    alt="trending"
                    className="mr-2 rounded"
                  />
                  <h2 className="font-semibold text-sm cursor-pointer dark:text-white text-black/80">
                    <div onClick={() => goToDetails(row.id)}>
                      <div className="block">
                        <div
                          className="line-clamp-2"
                          title={row?.question || "--"}
                        >
                          {row?.question || "--"}
                        </div>
                      </div>
                    </div>
                  </h2>
                </div>

                <div className="text-xs mt-4 mb-5 h-24 hideScrollbar overflow-y-auto space-y-2">
                  {row?.options?.map((item: OptionItem, idx: number) => (
                    <div
                      key={idx}
                      className="flex gap-2 justify-between items-center dark:text-white text-gray-700"
                    >
                      <span className="block max-w-full truncate">
                        {item?.name || "--"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[16px] font-semibold">{(item?.price * 100).toFixed(1)}%</span>
                        <button
                          onClick={() => handleBuyNow(row, item, "sell", idx)}
                          className="p-2 bg-red-500/40 cursor-pointer text-red-700 dark:text-red-400 font-semibold rounded-xs text-[10px] uppercase hover:bg-red-500 hover:text-white  transition-all duration-200 ease-in-out">
                          Sell
                        </button>
                        <button
                          onClick={() => handleBuyNow(row, item, "buy", idx)}
                          className="p-2 bg-green-600/40 cursor-pointer text-green-700 dark:text-green-400 font-semibold rounded-xs text-[10px] uppercase hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex absolute mt-5 bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
                  <span>
                    $ {Number(row?.stats?.totalVolume || 0)?.toFixed(2) || 0}
                  </span>
                  <span className="cursor-pointer"> <FaRegBookmark/></span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                No questions found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-md">
                There are no active premium questions available right now.
                Please check back later or explore other markets.
              </p>
            </div>
          )}
        </div>
      </div>
      <Authentication
        isLogin
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />

      <BuySell
        rowDetailss={rowDetails as null}
        isOpen={isModalOpen}
        onClose={() => {
          setOptionIndex(null);
          setIsModalOpen(false);
        }}
        orderType={buyType as string}
        handleChangeOrderType={setBuyType}
        option={options}
        optionIndex={optionIndex as number}
        fetchOrders={() => null}
      />
    </>
  );
};
export default Home;
