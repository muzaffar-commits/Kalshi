"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalSignup({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
      backdrop-blur-sm z-50 transition-all duration-300 z-40"
    >
      <div
        className="bg-white dark:bg-[#1D293D] p-6 rounded-xl shadow-lg 
        w-[100%] max-w-[320px] lg:max-w-[450px] relative z-50"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-900 dark:text-gray-200 dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
