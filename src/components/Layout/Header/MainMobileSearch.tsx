"use client";

import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function MobileFullSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  return (
    <>
      {/* 🔍 Search Icon */}
      <div className="lg:hidden inline-block">
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 flex items-center relative -right-8 justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          <FaSearch className="text-blue-400 dark:text-gray-200" />
        </button>
      </div>

      {/* 🧱 Full Page Search with EASE */}
      <div
        className={`fixed inset-0 z-[9999] bg-white dark:bg-gray-900 transform transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
          <FaSearch className="text-blue-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-base text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <button onClick={() => setOpen(false)}>
            <FaTimes className="text-gray-500 text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 text-gray-500">
          Start typing to search…
        </div>
      </div>
    </>
  );
}
