"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Authentication from "@/components/Pages/auth";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { useSelector } from "react-redux";
import ModalWithTabs from "@/components/Modal/BuySell/page";

const Blocks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const categoryDetails = useSelector(
    (state: any) => state?.category?.category
  );
  const questionAllList = async () => {
    try {
      const response = await commonQuestionFindById(categoryDetails?.id);

      if (response?.success) {
        setQuestionData(response?.data?.questions || []);
      } else {
        setQuestionData([]);
      }
    } catch (error: any) {
      console.log(error, "error");

      setQuestionData([]);
    }
  };
  useEffect(() => {
    questionAllList();
  }, [categoryDetails?.id]);

  return (
    <>
      <div className="max-w-[1268px] mx-auto px-4 mt-20 lg:mt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 lg:pt-0">
          {questionData?.map((row: any, index) => (
            <div
              key={index}
              className="border border-gray-200 relative min-h-48 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center mb-3">
                <Image
                  src="/img/blockimg1.jpg"
                  width={40}
                  height={40}
                  alt="trending"
                  className="mr-2 rounded"
                />
                <h2 className="font-semibold text-sm text-gray-800">
                  <Link href={`/detail/${row?.id}`}>
                    <span
                      className="block line-clamp-2"
                      title={row?.question || "--"}
                    >
                      {row?.question || "--"}
                    </span>
                  </Link>
                </h2>
              </div>

              <div className="text-xs mt-4 mb-5 h-24 overflow-y-auto space-y-2">
                {row?.options?.map((item: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex gap-2 justify-between items-center text-gray-700"
                  >
                    <span className="block max-w-full truncate">
                      {item?.name || "--"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span>{(item?.price * 100).toFixed(1)}%</span>
                      <button className="py-1 px-2 bg-[#0099FF]/40 text-white font-semibold rounded-xs text-[10px]">
                        Buy
                      </button>
                      <button className="py-1 px-2 bg-cyan-600/30 text-[#0099ff] font-semibold rounded-xs text-[10px]">
                        Sell
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex absolute mt-5 bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
                <span>${row?.stats?.totalVolume || 0}k</span>
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

          {/* <div className="bg-[#162033] min-h-52 relative rounded-xl p-4 shadow-md border border-[#334661] hover:border-[#232f4c]">
            <div className="flex items-center mb-3">
              <Image
                src="/img/blockimg2.jpg"
                width={40} // increased from 10 → better visibility
                height={40}
                alt="trending"
                className="mr-2 rounded"
              />
              <h2 className="font-semibold text-sm text-white">
                Can AI generate original artwork?
              </h2>
            </div>
            <div className="flex items-center mb-1">
              <div className="text-green-400 text-sm font-bold">75% Chance</div>
            </div>
            <div className="flex space-x-2 justify-between">
              <div className="flex flex-col flex-1">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-green-600/30 hover:bg-green-700/90 text-green-400 py-1 rounded-md text-md transition-colors duration-150 cursor-pointer"
                >
                  Buy Yes ↑
                </button>
                <h5 className="text-gray-400 mt-2 text-sm text-center">
                  $100 → <span className="text-green-600">$1,563</span>
                </h5>

                <ModalWithTabs
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>

              <div className="flex flex-col flex-1">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-red-600/30 hover:bg-red-700/70 text-red-600 py-1 rounded-md text-md cursor-pointer"
                >
                  Buy No ↓
                </button>
                <h5 className="mt-2 text-sm text-center text-gray-400">
                  $100 → <span className="text-green-600">$105</span>
                </h5>
              </div>
            </div>
            <div className="flex absolute bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
              <span>$500k vol.</span>
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
          </div> */}
        </div>
      </div>
      <Authentication
        isLogin
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};
export default Blocks;
