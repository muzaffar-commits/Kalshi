import { HighlightTexts, timeAgoCompact } from "@/utils/Content";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
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

export default function PostList({
  isIdea = false,
  allPosts = [],
  handleLikeUnlike = () => {},
  handleBookMarkOrUnBookMark = () => {},
}: PostListProps) {
  const [openCommentIds, setOpenCommentIds] = React.useState<number[]>([]);
  const toggleComments = (postId: number) => {
    setOpenCommentIds(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // close
          : [...prev, postId], // open
    );
  };
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
            openCommentIds.includes(row.id)
              ? "grid-rows-[1fr] opacity-100 mt-3"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
              >
                <div className="overflow-hidden">
                  <div className="pl-2 pr-2 py-3 bg-gray-50 dark:bg-[#2B394D] rounded-lg border border-gray-200 dark:border-gray-800">
                    {dummyData?.length > 0 ? (
                      dummyData.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex flex-col gap-1 py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                        >
                          <div className="flex flex-row gap-3">
                            <Image
                              src={comment.User.image_url}
                              width={30}
                              height={30}
                              className="w-8 h-8 rounded-full"
                              alt="user"
                            />

                            <div>
                              <div className="text-xs font-semibold">
                                {comment.User.username}
                                <span className="ml-2 text-[13px] text-gray-400">
                                  {timeAgoCompact(comment.createdAt)}
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
                              <span className="text-xs mt-1">
                                {row?.likeCount || 0}
                              </span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-500 cursor-pointer ">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))
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
