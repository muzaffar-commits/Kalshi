import {
  getCommentsList,
  postUserCommentLikeOrUnlike,
} from "@/components/service/apiService/user";
import { delay, HighlightTexts, timeAgoCompact } from "@/utils/Content";
import { CommentListSkeleton } from "@/utils/customSkeleton";
import { CommentInterface, IReply } from "@/utils/typesInterface";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface PostListProps {
  isIdea?: boolean;
  allPosts?: any[];
  handleLikeUnlike?: any;
  handleBookMarkOrUnBookMark?: any;
}

const dummyData = [
  {
    id: 201,
    content: "hello",
    createdAt: "2026-01-25T10:02:00Z",
    User: {
      id: 1,
      username: "unknown",
      image_url: "https://i.pravatar.cc/30?img=12",
    },
  },
  {
    id: 202,
    content: "@unknown hi hello",
    createdAt: "2026-01-25T10:05:00Z",
    User: {
      id: 1,
      username: "unknown",
      image_url: "https://i.pravatar.cc/30?img=12",
    },
  },
  {
    id: 203,
    content: "best platform for to predict the opinion",
    createdAt: "2026-01-25T10:10:00Z",
    User: {
      id: 1,
      username: "unknown",
      image_url: "https://i.pravatar.cc/30?img=12",
    },
  },
  {
    id: 204,
    content: "the cafeteria best opinion option",
    createdAt: "2026-01-25T10:15:00Z",
    User: {
      id: 1,
      username: "unknown",
      image_url: "https://i.pravatar.cc/30?img=12",
    },
  },
];
interface CommentState {
  open: boolean;
  loading: boolean;
  comments: CommentInterface[];
}

export default function PostList({
  isIdea = false,
  allPosts = [],
  handleLikeUnlike = () => {},
  handleBookMarkOrUnBookMark = () => {},
}: PostListProps) {
  const [commentMap, setCommentMap] = useState<Record<number, CommentState>>(
    {},
  );
  const toggleComments = async (postId: number) => {
    setCommentMap((prev) => {
      const isOpen = prev[postId]?.open ?? false;

      return {
        ...prev,
        [postId]: {
          open: !isOpen,
          loading: !isOpen && !prev[postId]?.comments?.length,
          comments: prev[postId]?.comments || [],
        },
      };
    });

    // 🔴 If already fetched OR closing → don't call API
    if (commentMap[postId]?.comments?.length) return;

    try {
      const [response] = await Promise.all([
        getCommentsList(postId), // ✅ postId passed here
        delay(1000),
      ]);

      setCommentMap((prev) => ({
        ...prev,
        [postId]: {
          open: true,
          loading: false,
          comments: response?.success ? response.data : [],
        },
      }));
    } catch {
      setCommentMap((prev) => ({
        ...prev,
        [postId]: {
          open: true,
          loading: false,
          comments: [],
        },
      }));
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

  console.log(commentMap, "commentMap=====>");

  return (
    <div>
      {allPosts?.map((row, index) => {
        const contentForPost =
          typeof row?.metadata === "string"
            ? JSON.parse(row.metadata)
            : row.metadata;
        return (
          <div
            key={row?.id}
            className="flex gap-3 py-4 border-b border-gray-200 dark:border-gray-800"
          >
            {/* Avatar */}
            <Image
              src={row?.User?.image_url || "https://i.pravatar.cc/40"}
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
                  {row?.User?.username || "--"}
                </span>
                <span className="text-gray-400">
                  {timeAgoCompact(row?.createdAt)}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                {contentForPost?.content && (
                  <HighlightTexts key={index} text={contentForPost?.content} />
                )}
                <br />
                <br />
                {contentForPost?.images?.length > 0 && (
                  <div className="bg-green-400 p-2 w-fit rounded shadow">
                    <Image
                      src={contentForPost?.images?.[0]}
                      height={500}
                      alt="post image"
                      width={500}
                    />
                  </div>
                )}
              </p>

              <div className="flex items-center gap-5 mt-3 text-gray-400">
                <span className="hover:text-gray-600 flex gap-1 items-center">
                  <button
                    onClick={() => toggleComments(row.id)}
                    className="cursor-pointer"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <span className="mt-1 text-xs">
                    {" "}
                    {row?.commentCount || 0}
                  </span>
                </span>

                <button
                  onClick={() =>
                    handleLikeUnlike(row?.id, row?.isLiked, isIdea)
                  }
                  className="flex items-center gap-1 hover:text-red-500"
                >
                  {row?.isLiked == 1 ? (
                    <FcLike size={16} />
                  ) : (
                    <Heart size={16} />
                  )}
                  <span className="text-xs mt-1">{row?.likeCount || 0}</span>
                </button>

                <button
                  onClick={() =>
                    handleBookMarkOrUnBookMark(
                      row?.id,
                      row?.isBookmarked,
                      isIdea,
                    )
                  }
                  className="hover:text-gray-600"
                >
                  {row?.isBookmarked == 1 ? (
                    <FaBookmark className="text-[#156bf7]" />
                  ) : (
                    <Bookmark size={16} />
                  )}
                </button>

                {/* <button className="hover:text-gray-600">
                            <Share2 size={16} />
                          </button> */}
              </div>

              <div
                className={`
          grid transition-all duration-300 ease-in-out origin-top
          ${
            commentMap[row.id]?.open
              ? "grid-rows-[1fr] opacity-100 mt-3"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
              >
                <div className="overflow-hidden">
                  <div className="pl-2 pr-2 py-3 bg-gray-50 dark:bg-[#2B394D] rounded-lg border border-gray-200 dark:border-gray-800">
                    {commentMap[row.id]?.loading && <CommentListSkeleton />}
                    {commentMap[row.id]?.comments?.length > 0 ? (
                      commentMap[row.id].comments.map((comment) => {
                        return (
                          <div
                            key={comment.id}
                            className="flex flex-col gap-1 py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                          >
                            <div className="flex flex-row gap-3">
                              <Image
                                src={comment?.User?.image_url}
                                width={30}
                                height={30}
                                className="w-8 h-8 rounded-full"
                                alt="user"
                              />

                              <div>
                                <div className="text-xs font-semibold">
                                  <span className="text-gray-900 font-semibold text-sm dark:text-white">
                                    {" "}
                                    {comment?.User?.username}
                                  </span>
                                  <span className="ml-2 text-[13px] text-gray-400">
                                    {timeAgoCompact(comment?.createdAt)}
                                  </span>
                                </div>

                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {comment.content}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5 pl-10 mt-3 text-gray-400">
                              <span className="hover:text-gray-600 flex gap-1 items-center">
                                <button
                                  onClick={() => toggleComments(comment.id)}
                                  className="cursor-pointer"
                                >
                                  <MessageCircle size={16} />
                                </button>
                                <span className="mt-1 text-xs">
                                  {" "}
                                  {comment?.commentCount || 0}
                                </span>
                              </span>

                              <div className="flex items-center gap-1 hover:text-red-500">
                                <button
                                  onClick={() =>
                                    handleCommentLikeUnlike(
                                      comment?.id,
                                      comment?.isUserLike,
                                    )
                                  }
                                >
                                  {comment?.isUserLike == 1 ? (
                                    <FcLike size={16} />
                                  ) : (
                                    <Heart size={16} />
                                  )}
                                </button>
                                <span className="text-xs mt-1">
                                  {comment?.likeCount || 0}
                                </span>
                              </div>

                              <button className="text-gray-400 hover:text-gray-500 cursor-pointer ">
                                Reply
                              </button>
                            </div>
                            <div className="pb-2 pl-10">
                              {comment?.replies?.length > 0 &&
                                comment?.replies?.map((replies: IReply) => (
                                  <div key={replies?.id}>
                                    <div className="md:flex border-t mt-4 border-gray-200 dark:border-gray-700 pt-2  items-start gap-4 ">
                                      <div
                                        // onClick={() =>
                                        //   handleUserDetails(replies?.User?.id)
                                        // }
                                        className="!h-11 !w-11 cursor-pointer flex items-center justify-center overflow-hidden rounded-full bg-gray-900 dark:bg-gray-500"
                                      >
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
                                            <span
                                              // onClick={() =>
                                              //   handleUserDetails(
                                              //     replies?.User?.id,
                                              //   )
                                              // }
                                              className="dark:text-gray-300 cursor-pointer hover:underline font-semibold text-gray-700"
                                            >
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
                                                // onClick={() =>
                                                //   handleCommentLikeUnlike(
                                                //     replies?.id,
                                                //     replies?.isUserLike,
                                                //   )
                                                // }
                                                />
                                              ) : (
                                                <Heart
                                                  // onClick={() =>
                                                  //   handleCommentLikeUnlike(
                                                  //     replies?.id,
                                                  //     replies?.isUserLike,
                                                  //   )
                                                  // }
                                                  size={18}
                                                />
                                              )}{" "}
                                              {replies?.likeCount || 0}
                                            </span>
                                            <div
                                              className="text-gray-400 hover:text-gray-200 text-sm cursor-pointer"
                                              // onClick={() =>
                                              //   handleSubComment(row, replies)
                                              // }
                                            >
                                              Reply
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* {row?.id == subCommentData?.id &&
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
                                                                    )} */}
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-sm text-gray-400">
                        No comments yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
