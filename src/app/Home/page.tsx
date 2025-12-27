"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Authentication from "@/components/Pages/auth";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { useSelector } from "react-redux";
import LoadingCard from "@/components/common/LoadingCard";
import BuySell from "@/components/Modal/BuySell/page";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Blocks = () => {
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [buyType, setBuyType] = useState<any>(null);
  const [options, setOptions] = useState<any>({});
  const [rowDetails, setRowDetails] = useState<any>({});
  const getToken = localStorage.getItem("token");
  const categoryDetails = useSelector(
    (state: any) => state?.category?.category
  );
  const questionAllList = async () => {
    setLoader(true);
    try {
      const [response]: any = await Promise.all([
        commonQuestionFindById(categoryDetails?.id || 1),
        delay(1000),
      ]);
      if (response?.success) {
        setQuestionData(response?.data?.questions || []);
      } else {
        setQuestionData([]);
      }
    } catch (error: any) {
      setQuestionData([]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 lg:pt-0">
          {loader
            ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((row) => <LoadingCard key={row} />)
            : questionData?.map((row: any, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 dark:bg-[#162033]  relative min-h-48 rounded-xl p-4 hover:shadow-md transition"
                >
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

                  <div className="text-xs mt-4 mb-5 h-24 hideScrollbar overflow-y-auto space-y-2">
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
                    <span></span>
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
