"use client";
import { useState } from "react";
interface RightDrawerProps {
  buttonLabel?: any;
  className?: string;
}

export default function Drawer({ buttonLabel, className }: RightDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Button to open drawer */}
      <button
        onClick={() => setIsOpen(true)}
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
          <h2 className="text-lg font-semibold dark:text-white text-gray-800">
            Menu
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 cursor-pointer dark:text-gray-300 hover:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content (Scrollable) */}
        <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100%-64px)]">
          <h5 className="font-bold uppercase dark:text-white text-[#0f172a] underline text-sm">
            World
          </h5>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-300 text-sm hover:text-blue-600"
          >
            Trending
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            New
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Politics
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Sports
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Culture
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            World
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Trump
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Putin
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            World
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Tariffs
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            IPOs
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Tech and Science
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Health
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Crypto
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Economics
          </a>
          <h5 className="font-bold uppercase dark:text-white text-[#0f172a] underline text-sm">
            Sports
          </h5>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300  hover:text-blue-600"
          >
            Cricket
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Football
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Tennis
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Badminton
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Gold
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Skydiving
          </a>
          <a
            href="#"
            className="block text-gray-700 text-sm dark:text-gray-300 hover:text-blue-600"
          >
            Chess
          </a>
        </nav>
      </div>
    </>
  );
}
