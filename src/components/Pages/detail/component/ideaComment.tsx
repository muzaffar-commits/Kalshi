import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import {
  PostFeeBack,
  UploadedImage,
  userIdInterFace,
} from "@/utils/typesInterface";
import {
  getFeed,
  getMyAllPost,
  imageUpload,
  postBookmarkOrUnBookMark,
  postLikeOrUnlike,
  userPost,
} from "@/components/service/apiService/user";
import toast from "react-hot-toast";
import GifPicker from "gif-picker-react";
import InputTextArea from "../../ideas/component/IdeaTabs/InputTextArea";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { delay } from "@/utils/Content";
import { FaRegCommentAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PostList from "./postList";

export default function IdeasActivityTabs({ marketId }) {
  const [activeTab, setActiveTab] = useState("ideas");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = React.useState<string | null>("");
  const [isPostLoader, setIsPostLoader] = React.useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<PostFeeBack[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<
    UploadedImage[] | null
  >(null);
  const [myPost, setMyPost] = useState<PostFeeBack[]>([]);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const userId = useSelector((state: userIdInterFace) => state.user.user?.id);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getListOfPost = useCallback(async () => {
    try {
      const [response] = await Promise.all([
        getFeed(userId, marketId),
        delay(1000),
      ]);
      if (response?.success) {
        setAllPosts(response.data ?? []);
      } else {
        setAllPosts([]);
      }
    } catch {
      setAllPosts([]);
    }
  }, [userId]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  const chooseImages = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      const response = await imageUpload(formData);
      if (response?.success) {
        setUploadedImage(response?.data);
      } else {
        setUploadedImage(null);
        toast.error(response?.message);
      }
    } catch (error: unknown) {
      setUploadedImage(null);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    chooseImages(file);
  };
  const removeImage = () => {
    setUploadedImage(null);
    setSelectedImage(null);
  };

  const postUserMessage = async () => {
    setIsPostLoader(true);
    try {
      const payload = {
        questionId: Number(marketId),
        metadata: {
          content: message,
          images: uploadedImage == null ? [] : [uploadedImage?.[0]?.url],
        },
      };
      const [response] = await Promise.all([userPost(payload), delay(1000)]);

      getListOfPost();
      if (response?.reponse?.status) {
        removeImage();
        setMessage("");
        // fetchPostList();
        setIsPostLoader(false);
      } else {
        toast.error(response?.reponse?.status);
        removeImage();
        setMessage("");
        setIsPostLoader(false);
      }
    } catch (error: unknown) {
      setIsPostLoader(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleLikeUnlike = async (
    id: number,
    isLike: number,
    isIdeas = Boolean,
  ) => {
    try {
      if (isLike == 1) {
        toast.success("Unlike");
      } else {
        toast.success("like");
      }
      if (!isIdeas) {
        setAllPosts((prev) =>
          prev.map((item) => {
            if (item.id == id) {
              const isLiked = item.isLiked === 1 ? 0 : 1;

              return {
                ...item,
                isLiked,
                likeCount: isLiked
                  ? item.likeCount + 1
                  : Math.max(item.likeCount - 1, 0),
              };
            }
            return item;
          }),
        );
      } else {
        setMyPost((prev) =>
          prev.map((item) => {
            if (item.id == id) {
              const isLiked = item.isLiked === 1 ? 0 : 1;

              return {
                ...item,
                isLiked,
                likeCount: isLiked
                  ? item.likeCount + 1
                  : Math.max(item.likeCount - 1, 0),
              };
            }
            return item;
          }),
        );
      }

      const payload = {
        postId: id,
      };

      await postLikeOrUnlike(payload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleBookMarkOrUnBookMark = async (
    id: number,
    isBookmarked: number,
    isIdeas = Boolean,
  ) => {
    try {
      if (!isIdeas) {
        setAllPosts((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              const booked = item.isBookmarked === 1 ? 0 : 1;
              return {
                ...item,
                isBookmarked: booked,
              };
            }
            return item;
          });
        });
      } else {
        setMyPost((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              const booked = item.isBookmarked === 1 ? 0 : 1;
              return {
                ...item,
                isBookmarked: booked,
              };
            }
            return item;
          });
        });
      }

      if (isBookmarked == 1) {
        toast.success("Remove for bookmarks");
      } else {
        toast.success("Bookmark successfully");
      }
      const payload = {
        postId: id,
      };
      await postBookmarkOrUnBookMark(payload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const fetchMyAllPost = async () => {
    try {
      const response = await getMyAllPost(userId, marketId);
      if (response.feed?.length > 0) {
        setMyPost(response?.feed);
      } else {
        setMyPost([]);
      }
    } catch {
      setMyPost([]);
    }
    // getMyAllPost
  };
  useEffect(() => {
    activeTab == "activity" && fetchMyAllPost();
  }, [activeTab]);

  console.log(myPost, "myPost");

  const handleRedirectAllPost = () => {
    router.push("/ideas");
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="border-b border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)]">
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
            {/* {activeTab === "ideas" && (
              <div className="flex items-center gap-2">
                <button
                  className=" flex items-center gap-2
      relative cursor-pointer
      px-4 pt-2 pb-1 rounded-full
      bg-gray-100 dark:bg-gray-500 dark:text-gray-200 text-gray-700 text-sm font-medium

      shadow-[0_4px_0_rgb(209,213,219)]
      transition-all duration-150 ease-in-out

      hover:bg-gray-200 dark:hover:bg-gray-600
      active:translate-y-[3px]
      active:shadow-[0_1px_0_rgb(209,213,219)]
       dark:shadow-[0_4px_0_rgb(17,24,39)]
       dark:active:shadow-[0_1px_0_rgb(17,24,39)]

    "
                >
                  All
                  <ChevronDown
                    size={16}
                    className={`transition-transform -rotate-90 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )} */}

            {/* {activeTab === "activity" && ( */}
            <div className="relative">
              <button
                onClick={handleRedirectAllPost}
                className=" flex items-center gap-2
      relative cursor-pointer
      px-4 pt-2 pb-1 rounded-full
      bg-gray-100 dark:bg-gray-500 dark:text-gray-200 text-gray-700 text-sm font-medium

      shadow-[0_4px_0_rgb(209,213,219)]
      transition-all duration-150 ease-in-out

      hover:bg-gray-200 dark:hover:bg-gray-600
      active:translate-y-[3px]
      active:shadow-[0_1px_0_rgb(209,213,219)]
       dark:shadow-[0_4px_0_rgb(17,24,39)]
       dark:active:shadow-[0_1px_0_rgb(17,24,39)]

    "
              >
                All
                <ChevronDown
                  size={16}
                  className={`transition-transform -rotate-90 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* <GifPicker tenorApiKey={"AIzaSyCTW7MKQHlK4qVplVnymchPmhhpQ51K0TI"} /> */}
      <div className="mt-4">
        {activeTab === "ideas" && (
          <>
            <div className="border border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)] rounded-2xl pb-3">
              <div className="flex items-start gap-4 w-full px-4 mt-1">
                <InputTextArea
                  message={message || ""}
                  setMessage={setMessage}
                />
              </div>

              <div className=" flex flex-row pl-7 justify-between items-center">
                <div className="flex justify-between w-full items-center  gap-4 mr-7">
                  <div className="flex flex-row items-center gap-4">
                    {/* <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2 px-4 cursor-pointer dark:text-gray-300 text-gray-800"
                    >
                      <IoImageOutline size={25} className="!text-sky-600" />
                    </button> */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm font-medium text-gray-500 hover:text-[#e4d4fc] cursor-pointer"
                    >
                      GIF
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/gif,image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                    />
                    {selectedImage?.name ? (
                      <div className="text-xs gap-4 dark:text-gray-200 text-gray-400 items-center flex flex-row">
                        {selectedImage?.name || ""}
                        {String(selectedImage?.name)?.length > 0 && (
                          <div
                            onClick={removeImage}
                            className="text-black text-sm cursor-pointer bg-white px-1.5 rounded"
                          >
                            x
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{/* <CircularWithValueLabel /> */}</div>
                    )}
                  </div>
                  <button
                    disabled={
                      !selectedImage?.name && String(message).trim().length <= 3
                    }
                    onClick={postUserMessage}
                    className={`
                                    py-1 px-4 w-16 flex items-center justify-center rounded-md
                                    text-lg font-semibold
                                    transition-all duration-200
                                    ${
                                      selectedImage?.name ||
                                      String(message).trim().length > 3
                                        ? `
                                          bg-emerald-500
                                          text-black
                                          hover:bg-emerald-600
                                          active:scale-95
                                          cursor-pointer
                                          shadow-[0_4px_14px_rgba(34,197,94,0.45)]
                                        `
                                        : `
                                          bg-gray-300
                                          text-gray-500
                                          border border-gray-400 dark:bg-gray-600 dark:border-gray-700
                                          cursor-not-allowed
                                          shadow-none
                                        `
                                    }
                                  `}
                  >
                    {isPostLoader ? (
                      <CircularProgress size={30} className="!text-white " />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Extra content after PredictionBox */}
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {allPosts?.length > 0 ? (
                <PostList
                  isIdea={false}
                  allPosts={allPosts}
                  handleBookMarkOrUnBookMark={handleBookMarkOrUnBookMark}
                  handleLikeUnlike={handleLikeUnlike}
                />
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                    <FaRegCommentAlt className="text-2xl text-gray-500 dark:text-gray-400" />
                  </div>

                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                    No Post yet
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    Be the first to share your thoughts and spark a
                    conversation.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "activity" && (
          <div className="text-gray-500 text-sm">
            {myPost?.length > 0 ? (
              <PostList
                isIdea={true}
                allPosts={myPost}
                handleBookMarkOrUnBookMark={handleBookMarkOrUnBookMark}
                handleLikeUnlike={handleLikeUnlike}
              />
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                  <FaRegCommentAlt className="text-2xl text-gray-500 dark:text-gray-400" />
                </div>

                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  Activity content here
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  Be the first to share your thoughts and spark a conversation.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
