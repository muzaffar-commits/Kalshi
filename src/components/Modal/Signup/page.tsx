"use client";
import {ReactNode} from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalSignup({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[100%] max-w-[320px] lg:max-w-[450px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-900 hover:text-gray-500 cursor-pointer">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
