"use client";

import { commonQuestionFindById } from "@/components/service/apiService/category";
import { getUserSearch } from "@/components/service/apiService/user";
import { delay } from "@/utils/Content";
import { SearchResultsSkeleton } from "@/utils/customSkeleton";
import { QuestionItem } from "@/utils/typesInterface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { GiNinjaStar } from "react-icons/gi";

export default function MobileFullSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [open]);

  const fetchUserList = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setResults([]);
      return;
    }
    setIsLoader(true);

    try {
      const [response] = await Promise.all([
        getUserSearch(searchValue, 5),
        delay(1000),
      ]);
      if (response.success) {
        setResults(response.data || []);
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
    const timer = setTimeout(() => {
      fetchUserList(query);
    }, 350); // slightly longer debounce for smoother feel

    return () => clearTimeout(timer);
  }, [query]);

  const router = useRouter();

  const handleRedirectUserProfile = (id: string | number) => {
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
    <>
      {/* Trigger button - visible only on mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm transition hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Open search"
        >
          <FaSearch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)} // close on backdrop click
      >
        <div
          className={`fixed inset-x-0 bottom-0 top-0 flex flex-col bg-white dark:bg-gray-950 transform transition-all duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        >
          {/* Header / Search bar */}
          <div className="sticky text-start top-0 z-10 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
            <div className="flex items-center gap-3 px-5 py-4">
              <FaSearch className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search users or questions..."
                className="flex-1 bg-transparent placeholder:text-sm placeholder:font-normal outline-none text-base font-medium text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>

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
                          const metaData = JSON.parse(item?.metadata || "{}");
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
      </div>
    </>
  );
}
