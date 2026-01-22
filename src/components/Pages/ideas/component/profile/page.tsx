import { getUsersAllDetails } from "@/components/service/apiService/user";
import { delay } from "@/utils/Content";
import React, { useCallback, useEffect, useState } from "react";

export default function Profile({
  targetId,
  userId,
}: {
  targetId: string;
  userId: string;
}) {
  // const [userDetails, setUserDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const getListOfPost = useCallback(async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getUsersAllDetails(targetId, userId),
        delay(1000),
      ]);
      if (response?.success) {
        console.log(response.data ?? []);
      } else {
        console.log([]);
      }
    } catch {
      console.log([]);
    } finally {
      setIsLoader(false);
    }
  }, [targetId, userId]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  // getUsersAllDetails
  return (
    <div className="flex items-center justify-center">
      {/* {isLoader ? "sldkfjs" : "slkdfj"} */}
      <div className="w-full rounded-xl   dark:border-gray-800 bg-white dark:bg-transparent p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* <img
      src="/avatar.png"
      alt="user"
      className="w-10 h-10 rounded-full object-cover"
    /> */}

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Nikhil
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2h ago
            </span>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          I believe this market will cross expectations 🚀 Strong momentum
          building up.
        </p>

        {/* Embedded Trade Card */}
        <div className="border border-emerald-400/40 dark:border-emerald-500/30 rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Winning Probability
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              LIVE
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              178%
            </span>

            <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white">
              Follow
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 text-gray-500 dark:text-gray-400">
          <div className="flex gap-6 text-sm">
            <button className="hover:text-red-500 transition">❤️ 12</button>
            <button className="hover:text-sky-500 transition">💬 4</button>
            <button className="hover:text-emerald-500 transition">↗</button>
          </div>

          <button className="text-xs hover:text-gray-700 dark:hover:text-gray-200">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
