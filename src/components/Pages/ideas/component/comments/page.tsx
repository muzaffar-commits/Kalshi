"use client";

import {
  getCommentsList,
  getFeedDetailsById,
  postBookmarkOrUnBookMark,
  postLikeOrUnlike,
  postUserCommentLikeOrUnlike,
  replyComments,
} from "@/components/service/apiService/user";
import { delay, HighlightTexts, timeAgoCompact } from "@/utils/Content";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaBookmark,
  FaChevronLeft,
  FaRegBookmark,
  FaRegCommentAlt,
  FaRegHeart,
} from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { LuUpload } from "react-icons/lu";
import { MdSend } from "react-icons/md";
import toast from "react-hot-toast";
import {
  CommentInterface,
  IReply,
  PostFeeBack,
  PostMetadata,
} from "@/utils/typesInterface";
import { CircularProgress } from "@mui/material";
import { Heart } from "lucide-react";
import MobileMenu from "../IdeaList/page";
import { useParams, useRouter, useSearchParams } from "next/navigation";
const PROFESSIONAL_EMOJIS = [
  "🙂",
  "😊",
  "😄",
  "👍",
  "👏",
  "🙏",
  "✅",
  "✔️",
  "❌",
  "💼",
  "📊",
  "📈",
  "📉",
  "💡",
  "🚀",
  "🔔",
  "📌",
  "⭐",
  "🏆",
];

export default function CommentPage() {
  const [postDetails, setPostDetails] = useState<PostFeeBack | null>(null);
  const [commentList, setCommentList] = useState<CommentInterface[]>([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [subCommentData, setSubCommentData] = useState<any>({});
  const [replyText, setReplyText] = useState("");
  const [subRepliesData, setSubRepliesData] = useState<any>({});
  const [isLike, setIsLike] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(0);
  const { slug } = useParams();
  const router = useRouter();

  console.log(slug, "params");

  useEffect(() => {
    setIsLoader(true);

    const timer = setTimeout(() => {
      setIsLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // getFeedDetailsById

  const postDetailsById = useCallback(async () => {
    // setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getFeedDetailsById(Number(slug)),
        delay(1000),
      ]);

      const detailsPost = response?.feed?.[0];
      setIsLike(detailsPost?.isLiked);
      setIsBookmarked(detailsPost?.isBookmarked);
      console.log(detailsPost, "detailsPost");

      setPostDetails(detailsPost || null);
    } catch {
      setPostDetails(null);
    }
  }, [slug]);

  useEffect(() => {
    postDetailsById();
  }, [postDetailsById]);

  const commentLists = useCallback(async () => {
    // setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getCommentsList(Number(slug)),
        delay(1000),
      ]);

      if (response?.success) {
        setCommentList(response.data ?? []);
      } else {
        setCommentList([]);
      }
    } catch {
      setCommentList([]);
    } finally {
      // setIsLoader(false);
    }
  }, [slug]);

  useEffect(() => {
    commentLists();
  }, [commentLists]);

  function parsePostMetadata(metadata: string | PostMetadata): PostMetadata {
    if (typeof metadata === "string") {
      try {
        return JSON.parse(metadata);
      } catch {
        return {};
      }
    }
    return metadata ?? {};
  }

  const contentForPost = parsePostMetadata(postDetails?.metadata);

  const handleSend = async () => {
    if (!value.trim()) return;

    try {
      const payload = {
        postId: slug,
        comment: value,
      };
      const response = await replyComments(payload);
      if (response.success) {
        toast.success("Message send successfully!");
        commentLists();
        setValue("");
        setOpen(false);
      } else {
        toast.error(response?.message || "something went wrong");
        setValue("");
        setOpen(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    console.log("SEND MESSAGE:", replyComments);
  };

  //   replyComments
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // stop new line
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = value.substring(0, start) + emoji + value.substring(end);

    setValue(text);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      textarea.focus();
    }, 0);
  };

  const handleSubComment = (row: any, replies: any) => {
    setSubCommentData(row);
    setSubRepliesData(replies);
    console.log(row, replies, "jjjjjjjjjjj");
  };

  const handleSubmitForSubComment = async (row: any) => {
    console.log(row, "Vijay=====>");

    try {
      const payload = {
        postId: slug,
        comment: `@${row?.User?.username} ${replyText}`,
        replyCommentId: subCommentData?.id,
      };
      const response = await replyComments(payload);
      if (response.success) {
        toast.success("Message send successfully!");
        commentLists();
        setValue("");
        setSubCommentData({});
        setSubRepliesData(null);
        setReplyText("");
        setOpen(false);
      } else {
        toast.error(response?.message || "something went wrong");
        setValue("");
        setOpen(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  console.log(subRepliesData, "subRepliesData");

  const handleLikeUnlike = async (id: number, isLike: number) => {
    try {
      if (isLike == 1) {
        toast.success("Unlike");
        setIsLike(0);
      } else {
        toast.success("like");
        setIsLike(1);
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

  const handleBookMarkOrUnBookMark = async () => {
    try {
      if (isBookmarked == 1) {
        toast.success("Remove for bookmarks");
        setIsBookmarked(0);
      } else {
        toast.success("Bookmark successfully");
        setIsBookmarked(1);
      }
      const payload = {
        postId: postDetails?.id,
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

  const handleCommentLikeUnlike = async (id: number, isLike: number) => {
    try {
      if (isLike == 1) {
        toast.success("Unlike");
        // setIsLike(0);
      } else {
        toast.success("like");
        // setIsLike(1);
      }

      const payload = {
        commentId: id,
      };

      const response = await postUserCommentLikeOrUnlike(payload);
      commentLists();
      if (!response.success) {
        toast.success(response?.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  //router

  const goBack = () => {
    router.back();
  };

  const handleUserDetails = (id: any) => {
    router.push(`/ideas/profile/${id}`);
  };
  return (
    <div className="dark:bg-[#1D293D] mt-40">
      <div className="max-w-[880px] xl:max-w-[1268px] mx-auto px-4 mt-36 lg:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white dark:bg-black border-t dark:border-gray-700">
              <h1 className="dark:text-white text-gray-800 lg:text-3xl text-xl mb-0 mt-3">
                Ideas
              </h1>
              <span className="text-gray-500 text-xs">
                Serving public conversation
              </span>
              <MobileMenu />
            </div>
          </div>
          <div className="lg:col-span-3 lg:border-l dark:border-gray-700 border-gray-200 min-h-1/2">
            <div className="lg:border-r dark:border-gray-700 border-gray-200">
              <div className="flex flex-col gap-0">
                <div className="pl-5 flex flex-row items-center gap-3">
                  <FaChevronLeft
                    className="cursor-pointer text-sky-300"
                    onClick={goBack}
                  />
                  <span className="text-gray-600 font-semibold dark:text-gray-400">
                    Details
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className={`flex 
             pt-4 
          pb-2 items-start gap-4 w-full md:px-4 px-0`}
                  >
                    <div
                      onClick={() =>
                        handleUserDetails(`${postDetails?.User?.id}`)
                      }
                      className="bg-gray-200 w-fit p-1.5 cursor-pointer rounded-full dark:bg-gray-500"
                    >
                      <Image
                        src={
                          postDetails?.User?.image_url ||
                          "https://cdn.vectorstock.com/i/500p/98/17/gray-man-placeholder-portrait-vector-23519817.jpg"
                        }
                        alt="user"
                        width={50}
                        height={50}
                        className="rounded-full "
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4>
                          <span
                            onClick={() =>
                              handleUserDetails(`${postDetails?.User?.id}`)
                            }
                            className="dark:text-gray-300 cursor-pointer hover:underline font-semibold text-gray-700"
                          >
                            {postDetails?.User?.username || "Unknown"}
                          </span>{" "}
                          <span className="text-xs dark:text-gray-500 text-gray-500">
                            {timeAgoCompact(postDetails?.updatedAt)}
                          </span>
                        </h4>
                      </div>
                      <p className="text-md mt-2 dark:text-gray-400 text-gray-800">
                        {contentForPost?.content && (
                          <HighlightTexts text={contentForPost?.content} />
                        )}
                        <br />
                        <br />

                        {Number(contentForPost?.images?.length) > 0 && (
                          <div className="bg-green-400 p-2 rounded">
                            <Image
                              src={contentForPost?.images?.[0] || ""}
                              height={500}
                              alt="post image"
                              width={500}
                            />
                          </div>
                        )}
                      </p>

                      <div className="mt-4">
                        <div className="flex justify-between">
                          <div className="flex gap-3 items-center">
                            <span
                              onClick={() =>
                                handleLikeUnlike(postDetails?.id, isLike)
                              }
                              className="
                                        p-2
                                        rounded
                                        inline-block
                                        text-gray-500
                                        dark:text-gray-400
                                        hover:bg-gray-400/30
                                        transition-all
                                        duration-200
                                        ease-in-out text-xl cursor-pointer
                                      "
                            >
                              {/* FcLike  */}

                              {isLike == 1 ? (
                                <FcLike />
                              ) : (
                                <FaRegHeart
                                // onClick={() =>
                                //   handleLikeUnlike(postDetails?.id, isLike)
                                // }
                                />
                              )}
                            </span>
                            <span className="inline-block relative -left-3 font-light text-gray-400">
                              {postDetails?.likeCount || 0}
                            </span>
                            <span
                              onClick={handleBookMarkOrUnBookMark}
                              className="  p-2  rounded
                                      inline-block
                                      text-gray-500
                                      dark:text-gray-400
                                      hover:bg-gray-400/30 transition-all   duration-200  ease-in-out text-lg cursor-pointer
                                    "
                            >
                              {isBookmarked == 1 ? (
                                <FaBookmark className="text-[#156bf7]" />
                              ) : (
                                <FaRegBookmark />
                              )}
                            </span>
                            <span className="inline-block relative -left-3 font-light text-gray-400"></span>
                            <span
                              className="
                                      p-2
                                      rounded
                                      inline-block
                                      text-gray-500
                                      dark:text-gray-400
                                      hover:bg-gray-400/30
                                      transition-all
                                      duration-200
                                      ease-in-out text-lg cursor-pointer
                                    "
                            >
                              <LuUpload />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative  mx-10">
                    <div
                      className="
                    relative rounded-xl  border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1D293D]
                    shadow-sm ideasScrollbarHide focus-within:ring-2 focus-within:ring-blue-500/30 transition
                "
                    >
                      <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Write a professional message..."
                        className="
                w-full
                ideasScrollbarHide
                min-h-[90px]
                resize-none
                bg-transparent
                px-4 pt-4 pb-12
                text-sm
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400
                outline-none
            "
                      />

                      {/* Footer Actions */}
                      <div
                        className="
      absolute bottom-2 left-0 right-0
      flex items-center justify-end
      px-3
    "
                      >
                        {/* Emoji Button */}
                        <button
                          type="button"
                          onClick={() => setOpen(!open)}
                          className="
          flex items-center gap-1
          text-gray-500 hover:text-gray-800
          dark:text-gray-400 dark:hover:text-white
          text-lg
          px-2 py-1
          rounded-md
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition
        "
                        >
                          🙂
                          {/* <span className="hidden sm:inline">Emoji</span> */}
                        </button>

                        {/* Reply Button */}
                        <button
                          type="button"
                          onClick={handleSend}
                          disabled={!value.trim()}
                          className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-300
                text-white
                text-sm
                cursor-pointer
                flex flex-row items-center gap-2
                font-medium
                px-4 py-1.5
                rounded-md
                transition
              "
                        >
                          Reply <MdSend />
                        </button>
                      </div>
                    </div>

                    {/* Emoji Picker */}
                    {open && (
                      <div
                        className="
      absolute right-0 bottom-[110%]
      w-72
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-700
      shadow-xl
      rounded-lg
      p-3
      flex flex-wrap gap-2
      z-20
    "
                      >
                        {PROFESSIONAL_EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => insertEmoji(emoji)}
                            className="
            text-xl
            rounded-md
            p-2
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition
          "
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="px-0">
                    {" "}
                    <hr className="border-gray-200 dark:border-gray-700" />
                  </div>
                  <div>
                    {isLoader ? (
                      <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                        <CircularProgress className="" />
                      </div>
                    ) : commentList?.length > 0 ? (
                      commentList?.map((row: CommentInterface) => {
                        return (
                          <div
                            key={row?.id}
                            className={` w-full border-b border-gray-200 dark:border-gray-700 md:px-4 px-0`}
                          >
                            <div className="md:flex  pt-4  items-start gap-4 ">
                              <div className="h-11 w-11 flex items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-500">
                                <Image
                                  src={
                                    row?.User?.image_url ||
                                    "https://cdn.vectorstock.com/i/500p/98/17/gray-man-placeholder-portrait-vector-23519817.jpg"
                                  }
                                  alt="user"
                                  width={30}
                                  height={30}
                                  className="rounded-full h-8 w-8"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4>
                                    <span className="dark:text-gray-300 hover:underline font-semibold text-gray-700">
                                      {row?.User?.username || "Unknown"}
                                    </span>{" "}
                                    <span className="text-xs dark:text-gray-500 text-gray-500">
                                      {timeAgoCompact(row?.updatedAt)}
                                    </span>
                                  </h4>
                                </div>
                                <p className="text-md mt-2 dark:text-gray-400 text-gray-800">
                                  {row?.content && (
                                    <HighlightTexts text={row?.content} />
                                  )}{" "}
                                </p>
                              </div>
                            </div>
                            <div className=" pl-10 py-2">
                              <div className="flex text-gray-400 flex-row items-center gap-4">
                                <span className="flex items-center gap-2">
                                  <span
                                    onClick={() =>
                                      handleCommentLikeUnlike(
                                        row?.id,
                                        row?.isUserLike,
                                      )
                                    }
                                    className="p-2  rounded
                                      inline-block
                                      text-gray-500
                                      dark:text-gray-400
                                      hover:bg-gray-400/30 transition-all   duration-200  ease-in-out text-lg cursor-pointer"
                                  >
                                    {row?.isUserLike == 1 ? (
                                      <FcLike
                                      // onClick={() =>
                                      //   handleCommentLikeUnlike(row?.id, row?.isUserLike)
                                      // }
                                      />
                                    ) : (
                                      <Heart size={18} />
                                    )}{" "}
                                  </span>
                                  {row?.likeCount || 0}
                                </span>
                                <div
                                  className="text-gray-400 hover:text-gray-200 text-sm cursor-pointer"
                                  onClick={() => handleSubComment(row, null)}
                                >
                                  Reply
                                </div>
                              </div>
                              {row?.id == subCommentData?.id &&
                                subRepliesData == null && (
                                  <div className="mt-2 w-full flex items-center gap-3 dark:bg-[#1D293D] border border-gray-700 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-sky-500/40">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex-shrink-0" />
                                    <input
                                      type="text"
                                      value={replyText}
                                      onChange={(e) =>
                                        setReplyText(e.target.value)
                                      }
                                      placeholder={`Reply to ${subCommentData?.User?.username || "--"}`}
                                      className="flex-1 bg-transparent outline-none text-sm placeholder-gray-300 text-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                                    />
                                    <button
                                      disabled={replyText.trim().length < 2}
                                      className={`text-sm font-medium transition ${
                                        replyText.trim().length >= 2
                                          ? "text-sky-400 hover:text-sky-300 cursor-pointer"
                                          : "text-gray-500 cursor-not-allowed"
                                      }`}
                                      onClick={() =>
                                        handleSubmitForSubComment(row)
                                      }
                                    >
                                      Reply
                                    </button>
                                  </div>
                                )}
                              <div className="pb-2">
                                {row?.replies?.length > 0 &&
                                  row?.replies?.map((replies: IReply) => (
                                    <div key={replies?.id}>
                                      <div className="md:flex border-t mt-4 border-gray-200 dark:border-gray-700 pt-2  items-start gap-4 ">
                                        <div className="!h-11 !w-11 flex items-center justify-center overflow-hidden rounded-full bg-gray-900 dark:bg-gray-500">
                                          <Image
                                            src={
                                              replies?.User?.image_url ||
                                              "https://cdn.vectorstock.com/i/500p/98/17/gray-man-placeholder-portrait-vector-23519817.jpg"
                                            }
                                            alt="user"
                                            width={30}
                                            height={30}
                                            className="rounded-full h-8 w-8"
                                          />
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <h4>
                                              <span className="dark:text-gray-300 hover:underline font-semibold text-gray-700">
                                                {replies?.User?.username ||
                                                  "Unknown"}
                                              </span>{" "}
                                              <span className="text-xs dark:text-gray-500 text-gray-500">
                                                {timeAgoCompact(row?.updatedAt)}
                                              </span>
                                            </h4>
                                          </div>
                                          <p className="text-md mt-2 dark:text-gray-400 text-gray-800">
                                            {replies?.content && (
                                              <HighlightTexts
                                                text={replies?.content}
                                              />
                                            )}{" "}
                                          </p>
                                          <div className=" py-2">
                                            <div className="flex text-gray-400 flex-row items-center gap-4">
                                              <span className="flex items-center gap-2">
                                                {replies?.isUserLike == 1 ? (
                                                  <FcLike
                                                    onClick={() =>
                                                      handleCommentLikeUnlike(
                                                        replies?.id,
                                                        replies?.isUserLike,
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <Heart
                                                    onClick={() =>
                                                      handleCommentLikeUnlike(
                                                        replies?.id,
                                                        replies?.isUserLike,
                                                      )
                                                    }
                                                    size={18}
                                                  />
                                                )}{" "}
                                                {replies?.likeCount || 0}
                                              </span>
                                              <div
                                                className="text-gray-400 hover:text-gray-200 text-sm cursor-pointer"
                                                onClick={() =>
                                                  handleSubComment(row, replies)
                                                }
                                              >
                                                Reply
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {row?.id == subCommentData?.id &&
                                        replies?.id == subRepliesData?.id && (
                                          <div className="mt-2 w-full flex items-center gap-3 dark:bg-[#1D293D] border border-gray-700 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-sky-500/40">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex-shrink-0" />
                                            <input
                                              type="text"
                                              value={replyText}
                                              onChange={(e) =>
                                                setReplyText(e.target.value)
                                              }
                                              placeholder={`Reply to ${subCommentData?.User?.username || "--"}`}
                                              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-300 text-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                                            />
                                            <button
                                              disabled={
                                                replyText.trim().length < 2
                                              }
                                              className={`text-sm font-medium transition ${
                                                replyText.trim().length >= 2
                                                  ? "text-sky-400 hover:text-sky-300 cursor-pointer"
                                                  : "text-gray-500 cursor-not-allowed"
                                              }`}
                                              onClick={() =>
                                                handleSubmitForSubComment(
                                                  replies,
                                                )
                                              }
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                          <FaRegCommentAlt className="text-2xl text-gray-500 dark:text-gray-400" />
                        </div>

                        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                          No comments yet
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                          Be the first to share your thoughts and start the
                          conversation.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
