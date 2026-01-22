"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, PlusCircle } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Profile Icon */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 cursor-pointer" />
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 mt-3 w-64
          bg-white dark:bg-[#1D293D]
          rounded-xl shadow-lg border dark:border-gray-800 border-gray-300
          transition-all duration-200 ease-out
          z-50
          ${
            open
              ? "opacity-100 visible translate-y-0 scale-100"
              : "opacity-0 invisible translate-y-2 scale-95"
          }
        `}
      >
        {/* Wallet Section */}
        <div className="px-4 py-3 border-b dark:border-gray-800 border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-400" />
            <div>
              <div className="font-semibold text-sm dark:text-white text-gray-700">
                abcd@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="py-2 text-sm">
          {["Ideas", "Privacy Policy", "Terms and Conditions"].map((item) => (
            <div
              key={item}
              className="px-4 py-2 dark:text-gray-500 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              {item}
            </div>
          ))}
          <div className="border-t my-2 dark:border-gray-800 border-gray-300" />
          <div className="flex items-center gap-3 px-4 py-2">
            <div>
              <ThemeToggle />
            </div>
            {/* <div>
              <PlusCircle className="text-green-700" />{" "}
              <span className="dark:text-white text-gray-600">Add Cash</span>
            </div> */}
          </div>

          <div className="border-t my-2 dark:border-gray-800" />

          <div className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-center font-semibold">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
