import React from "react";
import MobileMenu from "../IdeaList/page";

export default function Supports() {
  return (
    <div className="dark:bg-[#1D293D] mt-40">
      <div className="max-w-[880px] xl:max-w-[1268px] mx-auto px-4 mt-36 lg:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white dark:bg-[#1D293D] border-t dark:border-gray-700">
              <h1 className="dark:text-white text-gray-800 lg:text-3xl text-xl mb-0 mt-3">
                Ideas
              </h1>
              <span className="text-gray-500 text-xs">
                Serving public conversation
              </span>
              <MobileMenu />
            </div>
          </div>
          <div className="lg:col-span-3 lg:border-l dark:border-gray-700 border-gray-200 min-h-1/2">
            <div className="lg:border-r dark:border-gray-700 border-gray-200">
              <div className="flex items-center justify-center text-black dark:text-white">
                Supports
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
