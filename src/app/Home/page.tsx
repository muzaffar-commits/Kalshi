"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import ModalWithTabs from "@/components/Modal/BuySell/page";
import Link from "next/link";
import Authentication from "@/components/Pages/auth";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { log } from "console";
import { useSelector } from "react-redux";

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
              className="bg-[#162033] relative min-h-52 rounded-xl p-4 shadow-md border border-[#334661] hover:border-[#232f4c]"
            >
              <div className="flex items-center mb-3">
                <Image
                  src="/img/blockimg1.jpg"
                  width={40}
                  height={40}
                  alt="trending"
                  className="mr-2 rounded"
                />
                <h2 className="font-semibold text-sm text-white">
                  <Link href={`./Detail/${row?.id}`}>
                    {row?.question || "--"}
                  </Link>
                </h2>
              </div>

              <div className="space-y-2 text-xs">
                {row?.options?.map((item: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-white"
                  >
                    <span>{item?.name || "--"}</span>
                    <div className="flex items-center gap-1.5">
                      <span>{item?.price * 100}%</span>
                      <button className="py-1 px-2 bg-green-600/40 text-green-500 cursor-pointer hover:scale-105 shadow rounded-xs text-[10px]">
                        Buy
                      </button>
                      <button className="py-1 px-2 bg-red-600/30 text-red-600 shadow cursor-pointer hover:scale-105  rounded-xs text-[10px]">
                        Sell
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex absolute bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
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
          {/* block2 start */}
          <div className="bg-[#162033] min-h-52 relative rounded-xl p-4 shadow-md border border-[#334661] hover:border-[#232f4c]">
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
                {/* Modal */}
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
          </div>
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
