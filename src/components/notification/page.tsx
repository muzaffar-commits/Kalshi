"use client";
import { timeAgoCompact } from "@/utils/Content";
import { Bell, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  postAllReadNotification,
  postReadNotification,
} from "../service/apiService/user";
import toast from "react-hot-toast";

export default function NotificationBell({ data, setData, count, setCount }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  console.log(data, "data");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fetchNotification

  const markAsRead = async (row: any) => {
    try {
      const payload = {
        notificationId: row?.id,
      };
      setData((prev: any) =>
        prev.map((item: any) =>
          item.id === row?.id ? { ...item, isRead: true } : item,
        ),
      );
      setCount((prev) => prev - 1);
      const response = await postReadNotification(payload);
      if (response.success) {
        toast.success("Notification Read Successfully");
      }
      console.log(response, "read message");
    } catch {
      toast.error("Something went wrongs");
    }
  };

  const markAsReadAll = async (row: any) => {
    try {
      setData([]);
      setCount(0);
      const response = await postAllReadNotification();
      if (response.success) {
        toast.success("All notifications marked as read");
      }
      console.log(response, "read message");
    } catch {
      toast.error("Something went wrongs");
    }
  };

  //

  return (
    <div className="relative" ref={ref}>
      {/* Bell */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" dark:hover:text-white cursor-pointer relative"
      >
        <Bell size={30} className="dark:text-white text-sky-500" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
          {count || 0}
        </span>
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
        <div className="flex px-4 flex-row border-b border-gray-300 dark:border-gray-500 items-center justify-between">
          <div className=" py-3  text-gray-800 dark:text-gray-200 font-semibold text-sm">
            Notifications ({count})
          </div>
          <button
            // disabled
            onClick={markAsReadAll}
            className="
              flex items-center gap-1
              px-2 py-1.5
              text-xs
              rounded-full
              bg-gray-100 dark:bg-gray-800
              text-gray-500 hover:bg-gray-300 cursor-pointer "
          >
            <Check size={14} />
            Read All
          </button>
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto">
          {data?.length > 0 ? (
            <div className="px-4 py-3 border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              Not fountdsdf
            </div>
          ) : (
            data
              .filter((item) => item?.isRead === false)
              .map((row) => (
                <div
                  key={row?.id}
                  onClick={() => markAsRead(row)}
                  className="px-4 py-3 border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {/* Indicator */}
                    <span
                      className={`mt-1 h-2 w-2 rounded-full ${
                        row?.type === "sell"
                          ? "bg-red-500"
                          : row?.type === "buy"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    />

                    <div className="flex-1">
                      <div className="text-sm font-medium dark:text-white text-gray-800">
                        {row?.type}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {row?.message}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        {timeAgoCompact(row?.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 text-center text-sm text-blue-500 hover:underline cursor-pointer">
          View all notifications
        </div>
      </div>
    </div>
  );
}
