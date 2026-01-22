"use client";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const notifications = [
    {
      id: 1,
      title: "Order Filled",
      message: "You sold YES · Before April 1, 2026",
      time: "2m ago",
      type: "sell",
    },
    {
      id: 2,
      title: "Order Filled",
      message: "You bought NO · Before February 1, 2026",
      time: "10m ago",
      type: "buy",
    },
    {
      id: 3,
      title: "Price Alert",
      message: "YES price moved to 45¢ on Maduro exile market",
      time: "1h ago",
      type: "info",
    },
  ];

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
      {/* Bell */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
      >
        <Bell size={18} className="dark:text-white" />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 mt-3 w-60
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
        {/* Header */}
        <div className="px-4 py-3 border-b dark:border-gray-800 font-semibold text-sm">
          Notifications
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="px-4 py-3 border-b last:border-b-0 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* Indicator */}
                <span
                  className={`mt-1 h-2 w-2 rounded-full ${
                    n.type === "sell"
                      ? "bg-red-500"
                      : n.type === "buy"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                />

                <div className="flex-1">
                  <div className="text-sm font-medium dark:text-white">
                    {n.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {n.message}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 text-center text-sm text-blue-500 hover:underline cursor-pointer">
          View all notifications
        </div>
      </div>
    </div>
  );
}
