import {
  getMyAllPost,
  getUsersAllDetails,
  postFollowUser,
  postUnFollowUser,
} from "@/components/service/apiService/user";
import { delay } from "@/utils/Content";
import { UserProfileSkeleton } from "@/utils/customSkeleton";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Profile({
  targetId,
  userId,
}: {
  targetId: string;
  userId: string;
}) {
  // const [userDetails, setUserDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [followingData, setFollowingData] = useState([]);
  const usersOwn = useSelector((state: any) => state?.user?.user);
  const userDetails = followingData?.[0];
  const [myPost, setMyPost] = useState([]);

  console.log(targetId, "targetId====>");

  const targetIds = targetId ? targetId : userId;
  const getListOfPost = useCallback(async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getUsersAllDetails(targetIds, userId),
        delay(1000),
      ]);
      if (response?.success) {
        setFollowingData(response.data ?? []);
        console.log(response.data ?? [], "setFollowingData");
      } else {
        setFollowingData([]);
      }
    } catch {
      setFollowingData([]);
    } finally {
      setIsLoader(false);
    }
  }, [targetIds, userId]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  console.log(followingData, "followingData");

  console.log(userDetails, "userDetails");
  const joinedDate = userDetails?.user?.createdAt
    ? new Date(userDetails.user.createdAt).toLocaleDateString("en-CA")
    : "";

  const handleFollowing = async (status: boolean) => {
    try {
      setFollowingData((prev) =>
        prev.map((item, index) =>
          index === 0
            ? {
                ...item,
                isFollowing: !item.isFollowing,
                following: item.isFollowing
                  ? Number(item.following) - 1
                  : item.following + 1,
              }
            : item,
        ),
      );
      const payload = { targetUserId: targetId };
      let response;
      if (!status) {
        response = await postFollowUser(payload);
      } else {
        response = await postUnFollowUser(payload);
      }
      if (response.success) {
        toast.success(
          status ? "user Unfollow successfully" : "User Follow successfully",
        );
        // getListOfPost();
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Inter Server Error");
    }
  };

  const fetchMyAllPost = async () => {
    try {
      const response = await getMyAllPost(userId, "");
      if (response.success) {
        setMyPost(response?.data);
      }
    } catch {}
    // getMyAllPost
  };

  return (
    <>
      {isLoader ? (
        <UserProfileSkeleton />
      ) : (
        <div className="flex justify-center w-full px-5">
          <div
            className="
      w-full  rounded-2xl p-5
      bg-white/80 dark:bg-[#2B394D]/70
      backdrop-blur-xl
      border border-gray-200/60 dark:border-white/10
      
      transition-all duration-300
     
    "
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-purple-500 blur-md opacity-40" />
                  <Image
                    src={userDetails?.user?.image_url || "/img/user.png"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="relative rounded-xl object-cover border border-white/20"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      {userDetails?.user?.username || "0"}
                    </span>
                    <span className="text-xs text-emerald-500 font-medium">
                      ● Active
                    </span>
                  </div>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {joinedDate || "0"}
                  </span>
                  <div className="flex gap-5 mt-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">
                        {userDetails?.follower || "0"}
                      </strong>{" "}
                      Followers
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">
                        {userDetails?.following || "0"}
                      </strong>{" "}
                      Following
                    </span>
                  </div>
                </div>
              </div>

              {usersOwn?.id !== userDetails?.user?.id && (
                <button
                  onClick={() => handleFollowing(userDetails?.isFollowing)}
                  className={`
    px-5 py-2 rounded-full text-xs cursor-pointer font-semibold
    transition-all duration-300
    ${
      userDetails?.isFollowing
        ? `
          bg-gray-200 dark:bg-gray-700
          text-gray-800 dark:text-gray-200
          hover:bg-gray-300 dark:hover:bg-gray-600
          shadow-none
        `
        : `
          bg-gradient-to-r from-emerald-500 to-green-400
          text-black
          shadow-[0_8px_24px_rgba(16,185,129,0.45)]
          hover:scale-105 hover:shadow-[0_12px_32px_rgba(16,185,129,0.6)]
        `
    }
    active:scale-95
  `}
                >
                  {userDetails?.isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              I believe this market will cross expectations 🚀 Strong momentum
              building up with smart money inflow.
            </p>

            {/* EMBEDDED MARKET CARD */}

            {/* FOOTER ACTIONS */}
            <div className="mt-4 flex justify-between items-center text-gray-500 dark:text-gray-400">
              <div className="flex gap-6 text-sm">
                <button className="hover:text-emerald-500 transition">↗</button>
              </div>

              <button className="text-xs hover:text-gray-700 dark:hover:text-gray-200">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
