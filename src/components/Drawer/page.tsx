"use client";
import { useState } from "react";
interface RightDrawerProps {
  buttonLabel?: string;
  className?: string;
}

export default function Drawer({ buttonLabel, className } : RightDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Button to open drawer */}
      <button
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer text-white px-3 py-2 ${className ?? ""}`}>
        {buttonLabel}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div style={{zIndex:'99999'}}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0  right-0 h-full w-64 bg-[#1e293b] shadow-lg transform transition-transform duration-300  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500">
            ✕
          </button>
        </div>

          {/* Drawer Content (Scrollable) */}
          <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100%-64px)]">
          <h5 className="font-bold uppercase text-white underline text-sm">World</h5>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Trending</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">New</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Politics</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Sports</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Culture</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">World</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Trump</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Putin</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">World</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Tariffs</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">IPOs</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Tech and Science</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Health</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Crypto</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Economics</a>
          <h5 className="font-bold uppercase text-white underline text-sm">Sports</h5>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Cricket</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Football</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Tennis</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Badminton</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Gold</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Skydiving</a>
          <a href="#" className="block text-[#acb9cc] text-sm hover:text-blue-600">Chess</a>
        </nav>
      </div>
    </>
  );
}
