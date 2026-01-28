"use client";
import { getUserSearch } from "@/components/service/apiService/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function MainSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
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
    try {
      const response = await getUserSearch(searchValue);
      if (response.success) {
        setResults(response?.data);
      } else {
        setResults([]);
      }
      console.log(response, "serachUSErs");
    } catch {
      setResults([]);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
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
    router.push(`/users/${id}`);
  };
  return (
    <div className="relative w-full" ref={ref}>
      {/* INPUT */}
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-200" />

      <input
        type="text"
        value={query}
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
          className="
            absolute left-0 right-0 mt-2
            bg-white dark:bg-[#1D293D]
            border border-gray-200 dark:border-gray-700
            rounded-xl shadow-lg
            z-50
            max-h-60 overflow-y-auto
          "
        >
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                onClick={() => handleRedirectUserProfile(item?.id)}
                className="flex  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer  px-4 py-2 gap-3 flex-row items-center"
              >
                <Image
                  src={item?.image_url || "/img/blockimg1.jpg"}
                  height={30}
                  width={30}
                  alt="No Image"
                  className="rounded"
                />
                <div
                  key={index}
                  className="
                 
                  text-sm
                  text-gray-700 dark:text-gray-200
                  cursor-pointer
                 
                "
                >
                  {item?.username}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
