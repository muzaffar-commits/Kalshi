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
import { GiNinjaStar } from "react-icons/gi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import {
  isWatchListInterface,
  OptionItem,
  QuestionItem,
  QuestionItemSecond,
  RootState,
} from "@/utils/typesInterface";
import { delay } from "@/utils/Content";
import {
  fetchWatchList,
  postQuestionBookUnBookMark,
} from "@/components/service/apiService/user";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

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
interface eventSubCategory {
  category: {
    isEvent: boolean;
  };
}

export interface HideFilter {
  sports: boolean;
  crypto: boolean;
  earnings: boolean;
}

export interface CategoryFilters {
  search: "";
  frequency: "All" | "Daily" | "Weekly" | "Monthly";
  status: "Active" | "Resolved";
  sortBy:
    | "Newest"
    | "24h Volume"
    | "Total Volume"
    | "Competitive"
    | "Ending Soon";
  hideFilter: HideFilter;
}

export interface CategoryState {
  category: Record<string, any>;
  subCategory: any[];
  eventCategory: any[];
  selectSubCategory: Record<string, any>;
  isEvent: boolean;
  filters: CategoryFilters;
}

export interface RootStateNewssss {
  category: CategoryState;
}

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
  const [questionBookMark, setQuestionBookMark] = useState<QuestionItem[]>([]);
  const [buyType, setBuyType] = useState<string | null>(null);
  const [options, setOptions] = useState<OptionItem | null>(null);
  const [rowDetails, setRowDetails] = useState<QuestionItemSecond | null>(null);
  const [optionIndex, setOptionIndex] = useState<number | null>(null);
  // const [eventSubCategoryId, setEventSubCategoryId] = useState<number | null>(
  //   null,
  // );
  const eventSubCategoryId = null;
  const getToken = localStorage.getItem("token");
  const router = useRouter();
  const categoryDetails = useSelector(
    (state: RootState) => state?.category?.category,
  );
  const selectedSubCategory = useSelector(
    (state: selectedSubCategory) => state?.category?.selectSubCategory,
  );
  const isEvent = useSelector(
    (state: eventSubCategory) => state?.category?.isEvent,
  );
  const filtersForCategory = useSelector(
    (state: RootStateNewssss) => state?.category?.filters,
  );
  const isWatchList = useSelector(
    (state: isWatchListInterface) => state?.category?.isWatchList,
  );
  const userDetails = useSelector((state: RootState) => state?.user);
  const isFilterQuestion = useSelector(
    (state: isWatchListInterface) => state?.category?.isFilterQuestion,
  );
  const { search, sortBy, frequency, status, hideFilter } = filtersForCategory;
  const CATEGORY_MAP: Record<string, number> = {
    earnings: 18,
    sports: 7,
    crypto: 14,
  };

  const hiddenCategories = Object.entries(hideFilter)
    .filter(([_, value]) => value === true)
    .map(([key]) => CATEGORY_MAP[key]);

  console.log(frequency, "frequency");

  const questionAllList = useCallback(async () => {
    setLoader(true);
    try {
      const ids = isEvent ? eventSubCategoryId : selectedSubCategory?.id;

      const [response] = await Promise.all([
        commonQuestionFindById(
          categoryDetails?.id || 1,
          userDetails?.user?.id as string,
          ids,
          sortBy,
          frequency,
          status,
          search,
          hiddenCategories,
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
  }, [
    isWatchList,
    categoryDetails?.id,
    userDetails?.user?.id,
    selectedSubCategory?.id,
    eventSubCategoryId,
    isEvent,
    sortBy,
    frequency,
    status,
    search,
    hiddenCategories.join(","),
  ]);

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

  const bookMarkUnBookMark = async (id: string, status: boolean) => {
    try {
      if (isWatchList) {
        setQuestionBookMark((prev: any[]) =>
          prev.filter((item) => item.id !== id),
        );
      } else {
        setQuestionData((prev: any[]) =>
          prev.map((item) =>
            item.id === id ? { ...item, isBookmark: !item.isBookmark } : item,
          ),
        );
      }

      const payload = { questionId: id };
      const response = await postQuestionBookUnBookMark(payload);
      if (response.success) {
        toast.success(
          response.data?.bookmarked
            ? "Question added to bookmarks"
            : "Question removed from bookmarks",
        );
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.success("");
    }
  };
  const getWatchList = async () => {
    try {
      const response = await fetchWatchList();
      console.log(response?.data?.questions, "kkkkkkkkkkk");

      if (response.success) {
        setQuestionBookMark(response?.data?.questions || []);
      } else {
        setQuestionBookMark([]);
      }
    } catch {
      setQuestionBookMark([]);
    }
  };
  useEffect(() => {
    if (isWatchList) {
      getWatchList();
    }
  }, [isWatchList]);

  const questionListFilter = isWatchList ? questionBookMark : questionData;

  console.log(
    selectedSubCategory == null,
    isWatchList,
    "selectedSubCategory111",
  );

  return (
    <>
      <div
        className={`max-w-[1268px]  mx-auto px-4 pb-10 lg:mt-56 mt-28  ${selectedSubCategory == null && isFilterQuestion ? "mt-64" : "lg:mt-54"}`}
      >
        <div
          className={
            // isEvent
            //   ? ""
            //   :
            "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 lg:pt-0"
          }
        >
          {
            // isEvent ? (
            //   <SubCategory
            //     eventSubCategoryId={eventSubCategoryId}
            //     setEventSubCategoryId={setEventSubCategoryId}
            //     questionData={questionListFilter}
            //   />
            // ) :

            loader ? (
              [1, 2, 3, 4, 5, 6, 7, 8]?.map((row) => <LoadingCard key={row} />)
            ) : questionListFilter && questionListFilter.length > 0 ? (
              questionListFilter?.map((row: QuestionItem, index) => (
                <div
                  key={index}
                  className="z-10 border border-gray-200 dark:border-gray-700 dark:bg-[#2B394D] 
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
                          <span className="text-[16px] font-semibold">
                            {(item?.price * 100).toFixed(1)}%
                          </span>
                          <button
                            onClick={() => handleBuyNow(row, item, "sell", idx)}
                            className="p-2 bg-red-500/40 cursor-pointer text-red-700 dark:text-red-400 font-semibold rounded-xs text-[10px] uppercase hover:bg-red-500 hover:text-white  transition-all duration-200 ease-in-out"
                          >
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
                      {row?.stats?.totalVolume > 0 ? " $ " : ""}
                      {row?.stats?.totalVolume > 0 ? (
                        Number(row?.stats?.totalVolume || 0)?.toFixed(2)
                      ) : (
                        <span className="text-yellow-500 flex items-center gap-1">
                          <GiNinjaStar size={12} className="rotate-45" />
                          New
                        </span>
                      )}
                    </span>
                    <span className="cursor-pointer">
                      {" "}
                      {!row?.isBookmark ? (
                        <FaRegBookmark
                          onClick={() =>
                            !getToken
                              ? setIsOpen(true)
                              : bookMarkUnBookMark(row?.id, row?.isBookmark)
                          }
                        />
                      ) : (
                        <FaBookmark
                          onClick={() =>
                            !getToken
                              ? setIsOpen(true)
                              : bookMarkUnBookMark(row?.id, row?.isBookmark)
                          }
                          className="text-sky-500"
                        />
                      )}
                    </span>
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
            )
          }
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
