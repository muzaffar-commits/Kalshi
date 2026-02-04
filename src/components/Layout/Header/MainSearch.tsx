"use client";
import { commonQuestionFindById } from "@/components/service/apiService/category";
import { getUserSearch } from "@/components/service/apiService/user";
import { delay } from "@/utils/Content";
import { SearchResultsSkeleton } from "@/utils/customSkeleton";
import { QuestionItem } from "@/utils/typesInterface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiNinjaStar } from "react-icons/gi";

export default function MainSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const router = useRouter();
  // 🔹 Outside click close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserList = async (searchValue) => {
    setOpen(true);
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getUserSearch(searchValue, 5),
        delay(1000),
      ]);
      if (response.success) {
        setResults(response?.data);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      // setOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      fetchUserList(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleRedirectUserProfile = (id) => {
    setQuery("");
    setOpen(false);
    router.push(`/ideas/profile/${id}`);
  };

  const questionAllList = useCallback(async () => {
    if (!query.trim()) {
      setQuestionData([]);
      return;
    }

    try {
      const [response] = await Promise.all([
        commonQuestionFindById(1, "", null, "", "", "", query, null),
        delay(800),
      ]);

      if (response?.success) {
        setQuestionData(response.data.questions ?? []);
      } else {
        setQuestionData([]);
      }
    } catch {
      setQuestionData([]);
    }
  }, [query]);

  useEffect(() => {
    questionAllList();
  }, [questionAllList]);

  const handleRedirectMarketDetails = (id: string | number) => {
    setQuery("");
    setOpen(false);
    router.push(`/market/${id}`);
  };
  return (
    <div className="relative w-full" ref={ref}>
      {/* INPUT */}
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-200" />

      <input
        type="text"
        onFocus={() => setOpen(true)}
        value={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setOpen(true);
          }
        }}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Opinion Kings"
        className="
          w-full pl-10 pr-4 py-2
          rounded-full
          bg-gray-100 dark:bg-gray-700
          text-gray-700 dark:text-gray-200
          text-sm
          focus:outline-none
        "
      />

      {/* DROPDOWN */}
      {open && (
        <div
          onWheel={(e) => e.stopPropagation()}
          className="
            absolute left-0 top-full mt-2
w-full max-w-full
bg-white dark:bg-[#1D293D]
border border-gray-200 dark:border-gray-700
rounded-xl shadow-lg
z-50
max-h-96 overflow-y-auto overscroll-contain
scroll-smooth

          "
        >
          <div className="flex-1 text-start overflow-y-auto overscroll-contain px-3 pr-6 py-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {isLoader ? (
              <>
                <SearchResultsSkeleton />
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Users
                  </h3>

                  {results.length > 0 ? (
                    <div className="space-y-1.5">
                      {results.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleRedirectUserProfile(item.id)}
                          className="group flex items-center gap-3.5 rounded-xl px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-900/60 cursor-pointer active:scale-[0.98]"
                        >
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.image_url || "/img/user.png"}
                              height={48}
                              width={48}
                              alt={item.username || "User"}
                              className="rounded-full object-cover ring-1 ring-gray-200/50 dark:ring-gray-700/50"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.username || "—"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              View profile
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {query.trim()
                        ? "No users found"
                        : "Start typing to search users"}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Questions
                  </h3>

                  {query.trim() ? (
                    questionData.length > 0 ? (
                      <div className="space-y-1.5">
                        {questionData.map((item) => {
                          const metaData =
                            typeof item?.metadata === "string"
                              ? JSON.parse(item.metadata)
                              : item?.metadata || {};

                          return (
                            <div
                              key={item.id}
                              onClick={() =>
                                handleRedirectMarketDetails(item.id)
                              }
                              className="group flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition hover:bg-gray-100 dark:hover:bg-gray-900/60 cursor-pointer active:scale-[0.98]"
                            >
                              <div className="relative flex-shrink-0">
                                <Image
                                  src={metaData?.imageUrl || "/img/user.png"}
                                  height={48}
                                  width={48}
                                  alt="Question"
                                  className="rounded-full object-cover ring-1 ring-gray-200/50 dark:ring-gray-700/50"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-1 text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {item.question || "—"}
                                </p>
                                <span className="flex text-xs items-center gap-1">
                                  {item?.stats?.totalVolume > 0 ? (
                                    <>
                                      <span className="text-yellow-500 font-semibold">
                                        $
                                      </span>
                                      <span className="text-gray-500">
                                        {Number(
                                          item?.stats?.totalVolume || 0,
                                        ).toFixed(2)}{" "}
                                        Vol
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-yellow-500 flex items-center gap-1">
                                      <GiNinjaStar
                                        size={12}
                                        className="rotate-45"
                                      />
                                      New
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        No questions found
                      </p>
                    )
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      Type to discover questions
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
