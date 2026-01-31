"use client";
import { timeAgoCompact } from "@/utils/Content";
import { Bell, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  fetchNotification,
  fetchUnReadCountNotification,
  postAllReadNotification,
  postReadNotification,
} from "../service/apiService/user";
import toast from "react-hot-toast";
import { IoMdNotificationsOutline } from "react-icons/io";
import socket from "../socket";

export default function NotificationBell({ userId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [notificationData, setNotificationData] = useState([]);
  const [countNotification, setCountNotification] = useState(0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationList = async () => {
    try {
      const response = await fetchNotification();
      if (response?.success) {
        setNotificationData(response?.data || []);
      } else {
        setNotificationData([]);
      }
    } catch {
      setNotificationData([]);
    }
  };
  useEffect(() => {
    open && getNotificationList();
  }, [open]);
  const getUnReadCountNotification = async () => {
    try {
      const response = await fetchUnReadCountNotification();
      if (response?.success) {
        setCountNotification(response?.count ?? 0);
      } else {
        setCountNotification(0);
      }
    } catch {
      setCountNotification(0);
    }
  };
  useEffect(() => {
    getUnReadCountNotification();
  }, []);

  const markAsRead = async (row: any) => {
    try {
      const payload = {
        notificationId: row?.id,
      };
      setNotificationData((prev: any) =>
        prev.map((item: any) =>
          item.id === row?.id ? { ...item, isRead: true } : item,
        ),
      );
      setCountNotification((prev) => prev - 1);
      const response = await postReadNotification(payload);
      if (response.success) {
        toast.success("Notification Read Successfully");
      }
    } catch {
      toast.error("Something went wrongs");
    }
  };

  const markAsReadAll = async (row: any) => {
    try {
      setNotificationData([]);
      setCountNotification(0);
      const response = await postAllReadNotification();
      if (response.success) {
        toast.success("All notifications marked as read");
      }
      console.log(response, "read message");
    } catch {
      toast.error("Something went wrongs");
    }
  };

  useEffect(() => {
    socket.emit(`subscribe:userNotification`, userId);
    const handleNotification = (payload: any) => {
      toast.success(payload?.message || "");
      setCountNotification((prev: number) => prev + 1);
    };

    socket.on("notification", handleNotification);

    return () => {
      // socket.emit("unsubscribeLiveTrade");
      socket.off("notification", handleNotification);
    };
  }, [socket.connected]);

  return (
    <div className="relative" ref={ref}>
      {/* Bell */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" dark:hover:text-white cursor-pointer relative"
      >
        <Bell size={20} className="dark:text-white/60 text-sky-500 mt-4" />
        <span className="absolute top-2 -right-2 bg-red-500 text-white w-4.5 h-4.5 leading-5 text-center rounded-full text-xs">
          {countNotification || 0}
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute lg:right-0 -right-16 mt-3 w-72
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
        <div className="flex px-4 flex-row border-b border border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)] items-center justify-between">
          <div className=" py-3  text-gray-800 dark:text-gray-200 font-semibold text-sm">
            Notifications ({countNotification})
          </div>
          <button
            // disabled
            onClick={markAsReadAll}
            className="
              flex items-center gap-1
              px-2 py-1.5
              text-xs
              rounded-full
              bg-gray-100 dark:bg-gray-600
              text-gray-500 dark:text-gray-300 hover:bg-gray-300 hover:dark:bg-gray-700 cursor-pointer "
          >
            <Check size={14} />
            Read All
          </button>
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto">
          {notificationData?.filter((item) => item?.isRead === false)
            ?.length === 0 ? (
            <div className="px-4 py-3 flex flex-col items-center justify-center text-xs border-b text-gray-500 dark:text-gray-300 last:border-b-0 dark:border-gray-700  cursor-pointer">
              <IoMdNotificationsOutline
                size={30}
                className="text-gray-300 dark:text-gray-500"
              />
              <span>Not Found Notification</span>
            </div>
          ) : (
            notificationData
              .filter((item) => item?.isRead === false)
              .map((row) => (
                <div
                  key={row?.id}
                  onClick={() => markAsRead(row)}
                  className="px-4 py-3 border-b last:border-b-0 border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)] hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
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
      </div>
    </div>
  );
}
