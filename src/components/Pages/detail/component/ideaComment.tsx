import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { MessageCircle, Heart, Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import PredictionBox from "./commentBox";

export default function IdeasActivityTabs() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [filter, setFilter] = useState("None");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="border-b dark:border-gray-800 border-gray-200">
        <div className="flex items-center justify-between py-3">
          {/* Tabs */}
          <div className="flex items-center gap-6 text-lg font-medium">
            <button
              onClick={() => setActiveTab("ideas")}
              className={`pb-1 ${
                activeTab === "ideas"
                  ? "dark:text-white text-black border-b-2 dark:border-white/60 border-black"
                  : "text-gray-400 cursor-pointer text-lg"
              }`}
            >
              Ideas
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-1 ${
                activeTab === "activity"
                  ? "dark:text-white text-black border-b-2 dark:border-white/60 border-black"
                  : "text-gray-400 cursor-pointer text-lg"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Right Controls */}
          <div>
            {activeTab === "ideas" && (
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-full bg-black text-white text-sm">
                  This event
                </button>
                <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm">
                  All
                </button>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-4 py-1.5 border dark:border-gray-300 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:text-gray-800"
                >
                  {filter === "None" ? "Minimum amount" : filter}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border text-gray-500 z-50">
                    {[
                      "None",
                      "$1",
                      "$10",
                      "$100",
                      "$1,000",
                      "$10,000",
                      "$100,000",
                    ].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setFilter(amount);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          filter === amount ? "font-medium" : ""
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="mt-4">
        {activeTab === "ideas" && (
          <>
            <PredictionBox />

            {/* Extra content after PredictionBox */}
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex gap-3 py-4 border-b border-gray-200 dark:border-gray-800">
                {/* Avatar */}
                <Image
                  src="https://i.pravatar.cc/40"
                  alt="user"
                  height={20}
                  width={20}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Holco
                    </span>
                    <span className="text-gray-400">4h</span>

                    <span className="dark:text-white font-medium">
                      Yes · Before April 1, 2026
                    </span>
                  </div>

                  {/* Message */}
                  <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                    latest update: the aircraft carriers Bush and Lincoln have
                    gone quiet. they are no longer broadcasting positions. 13
                    tankers sortied across the pond today with 8 more entourage.
                    THAAD&apos;s and patriots are being moved into theater as
                    well. F-15&apos;s arrived in Jordan
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-5 mt-3 text-gray-400">
                    <button className="hover:text-gray-600">
                      <MessageCircle size={16} />
                    </button>

                    <button className="flex items-center gap-1 hover:text-red-500">
                      <Heart size={16} />
                      <span className="text-xs">3</span>
                    </button>

                    <button className="hover:text-gray-600">
                      <Bookmark size={16} />
                    </button>

                    <button className="hover:text-gray-600">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "activity" && (
          <div className="text-gray-500 text-sm">Activity content here</div>
        )}
      </div>
    </div>
  );
}
