"use client";

import GiphyPicker from "@/components/common/GiphyPicker";
import { Modal, IconButton } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function GiphyModal({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="bg-white dark:bg-[#0F172A]
                     w-[420px] max-h-[90vh]
                     rounded-2xl shadow-2xl
                     flex flex-col overflow-hidden"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 border-b
                          border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search GIFs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-full
                           bg-gray-100 dark:bg-gray-800
                           border border-transparent
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                           text-gray-800 dark:text-gray-100
                           placeholder:text-gray-400 transition"
              />
            </div>

            {/* Close */}
            <IconButton
              size="small"
              onClick={onClose}
              className="!text-gray-500 dark:!text-gray-300"
            >
              <IoClose />
            </IconButton>
          </div>

          {/* Scrollable Body */}
          <div
            className="
              flex-1 p-3
              overflow-y-hidden hover:overflow-y-auto
              scroll-smooth
              scrollbar-hide
            "
          >
            <GiphyPicker
              query={query}
              onSelect={(url) => {
                onSelect(url);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
