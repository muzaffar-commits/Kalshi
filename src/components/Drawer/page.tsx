"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface RightDrawerProps {
  buttonLabel?: React.ReactNode;
  className?: string;
}

export default function Drawer({ buttonLabel, className }: RightDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };
  return (
    <>
      {/* Button to open drawer */}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className={`cursor-pointer text-white px-3 py-2 ${className ?? ""}`}
      >
        {buttonLabel}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0  right-0 h-full w-64 bg-white dark:bg-[#1e293b] shadow-lg z-50 transform transition-transform duration-300  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className=" flex items-center gap-2">
            <Image
              src="/img/opinionLogo.jpg"
              alt="Opinion logo"
              width={40}
              height={40}
              className="h-auto rounded-full"
            />
            <span className="font-serif text-xl text-gray-400">
              Opinion Kings
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 cursor-pointer dark:text-gray-300 hover:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content (Scrollable) */}
        <div className="space-y-2.5 mt-5">
          {/* Privacy Policy */}
          <Link
            href="/privacyPolicy"
            onClick={closeDrawer}
            className="block px-4 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 
                           hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#0099ff] transition"
          >
            Privacy Policy
          </Link>

          {/* Terms & Conditions */}
          <Link
            href="/termsAndConditions"
            onClick={closeDrawer}
            className="block px-4  rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 
                           hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#0099ff] transition"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </>
  );
}
