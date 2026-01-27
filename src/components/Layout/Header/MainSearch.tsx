import React from "react";
import { FaSearch } from "react-icons/fa";

export default function MainSearch() {
  return (
    <div>
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-200 text-gray-400" />
        <input
          type="text"
          placeholder="Search opinion kings"
          className="w-full pl-10 pr-4 py-2 dark:text-gray-300 text-gray-700 rounded-full bg-gray-100 dark:bg-gray-700 text-md focus:outline-none"
        />
      </div>
    </div>
  );
}
