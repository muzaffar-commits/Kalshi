"use client";
import { useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/popupDropdown/page";
import ExpirationDropdown from "@/components/BlockDropdown/page";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalWithTabs({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<"true" | "false">("true");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-50 z-50">
      <div className="bg-[#ffffff] p-6 lg:p-10 rounded-xl shadow-lg w-[100%] max-w-[320px] lg:max-w-[430px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-900 hover:text-gray-500"
        >
          ✕
        </button>

              <div className="flex justify-between mb-2">
                  <Image
                      src="/img/blockimg1.jpg"
                      alt="NYC Flag"
                      width={60}
                      height={60}
                      className="mr-4 rounded-lg max-h-[45px]"
                  />
                  <h6 className="text-sm">Will the Fed do a rate cut of more than 25bps this year?</h6>
              </div>
        <h2 className="text-blue-800 ml-18 mb-3 font-semibold">Buy Yes</h2>

        {/* Tabs */}
        <div className="border-b border-[#cccccc] mb-4 relative">
            <div className="absolute right-0 top-0"><Dropdown onSelect={(v) => console.log("selected:", v)} />
</div>
          <button
            onClick={() => setActiveTab("true")}
            className={`py-2 mr-6 text-center font-medium ${
              activeTab === "true"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900 cursor-pointer"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab("false")}
            className={`py-2 text-center font-medium ${
              activeTab === "false"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900 cursor-pointer"
            }`}
          >
            Sell
        </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "true" && (
            <div className="text-center text-gray-800">
                          <div className="flex justify-between space-x-2">
                          <div className="flex-1">
  <button
    className="flex items-center justify-center gap-2 bg-green-600/30 hover:bg-green-700/90 text-green-400 py-2 rounded-md text-md transition-colors w-full duration-150 active:bg-green-700 focus:bg-green-800 cursor-pointer"
  >
    <span>Yes 6</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.007 7.54a5.965 5.965 0 0 0 -4.008 -1.54a6 6 0 0 0 -5.992 6c0 3.314 2.682 6 5.992 6a5.965 5.965 0 0 0 4 -1.536" />
      <path d="M12 20v-2" />
      <path d="M12 6v-2" />
    </svg>
  </button>
</div>

                              <div className="flex-1">
  <button
    className="flex items-center justify-center gap-2 bg-red-600/30 w-full hover:bg-red-700/70 text-red-600 py-2 rounded-md text-md focus:bg-red-800 cursor-pointer focus:text-red-500"
  >
    <span>No 95</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.007 7.54a5.965 5.965 0 0 0 -4.008 -1.54a6 6 0 0 0 -5.992 6c0 3.314 2.682 6 5.992 6a5.965 5.965 0 0 0 4 -1.536" />
      <path d="M12 20v-2" />
      <path d="M12 6v-2" />
    </svg>
  </button>
</div>

                          </div>

                          <div className="mt-3">
                              <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                                  <span className="text-start">
                                      <span className="block text-sm text-gray-400">Contacts</span>
                                      <span className="block text-sm text-green-700">Earn 4% Interest</span>
                                  </span>
                                  <span className="text-end text-2xl text-gray-600 text-bold">0</span>
                              </label>
                          </div>
                         

                          <div className="mt-3">
                              <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                                  <span className="text-start">
                                      <span className="block text-sm text-gray-400">Limit price</span>
                                  </span>
                                  <span className="text-end text-md text-gray-950 font-semibold flex items-center">96 <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      display="inline-block"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#000000"
                                      stroke-width="4"
                                      stroke-linecap="round"
                                      stroke-linejoin="round">
                                      <path d="M16.007 7.54a5.965 5.965 0 0 0 -4.008 -1.54a6 6 0 0 0 -5.992 6c0 3.314 2.682 6 5.992 6a5.965 5.965 0 0 0 4 -1.536" />
                                      <path d="M12 20v-2" />
                                      <path d="M12 6v-2" />
                                  </svg></span>
                              </label>
                          </div>
             <ExpirationDropdown/>
             <div className="mt-3">
  <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer">
    {/* Left Side Label */}
    <span className="text-start">
      <span className="block text-xs text-gray-400">Place as resting order only</span>
    </span>

    {/* Right Side Checkbox */}
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 border-gray-300 rounded "
    />
  </label>
</div>
<div className="mt-3">
    <button className="py-3 px-4 text-lg text-white font-bold bg-emerald-500 rounded-xl w-full max-w-full">Sign Up To Trade</button>
</div>
          </div>
          )}
          {activeTab === "false" && (
            <div className="text-center text-gray-800">
                 <div className="mt-3">
                              <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                                  <span className="text-start">
                                      <span className="block text-sm text-gray-400">Contacts</span>
                                      <span className="block text-sm text-green-700">Earn 4% Interest</span>
                                  </span>
                                  <span className="text-end text-2xl text-gray-600 text-bold">0</span>
                              </label>
                          </div>
                          <div className="mt-3">
                              <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                                  <span className="text-start">
                                      <span className="block text-sm text-gray-400">Limit price</span>
                                  </span>
                                  <span className="text-end text-md text-gray-950 font-semibold flex items-center">96 <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      display="inline-block"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#000000"
                                      stroke-width="4"
                                      stroke-linecap="round"
                                      stroke-linejoin="round">
                                      <path d="M16.007 7.54a5.965 5.965 0 0 0 -4.008 -1.54a6 6 0 0 0 -5.992 6c0 3.314 2.682 6 5.992 6a5.965 5.965 0 0 0 4 -1.536" />
                                      <path d="M12 20v-2" />
                                      <path d="M12 6v-2" />
                                  </svg></span>
                              </label>
                          </div>
                          <ExpirationDropdown/>
                                       <div className="mt-3">
  <label className="w-full max-w-full p-3 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer">
    {/* Left Side Label */}
    <span className="text-start">
      <span className="block text-xs text-gray-400">Place as resting order only</span>
    </span>

    {/* Right Side Checkbox */}
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 border-gray-300 rounded "
    />
  </label>
</div>
                          <div className="mt-3">
    <button className="py-3 px-4 text-lg text-white font-bold bg-emerald-500 rounded-xl w-full max-w-full">Sign Up To Trade</button>
</div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
