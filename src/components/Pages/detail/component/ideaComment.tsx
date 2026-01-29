import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { MessageCircle, Heart, Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import PredictionBox from "./commentBox";
import { UploadedImage } from "@/utils/typesInterface";
import { imageUpload, userPost } from "@/components/service/apiService/user";
import toast from "react-hot-toast";
import InputTextArea from "../../ideas/component/IdeaTabs/InputTextArea";
import { CircularProgress } from "@mui/material";
import { IoImageOutline } from "react-icons/io5";

export default function IdeasActivityTabs() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [filter, setFilter] = useState("None");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = React.useState<string | null>("");
  const [isPostLoader, setIsPostLoader] = React.useState<boolean>(false);

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<
    UploadedImage[] | null
  >(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      const metadata = {
        content: message,
        images: uploadedImage == null ? [] : [uploadedImage?.[0]?.url],
      };
      const response = await userPost({ metadata });

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

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="border-b dark:border-gray-800 border-gray-200">
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
            {activeTab === "ideas" && (
              <div className="flex items-center gap-2">
                {/* Active */}
                <button
                  className=" cursor-pointer
      relative
      px-4 pt-2 pb-1 rounded-full
      bg-black text-white text-sm font-medium

      shadow-[0_4px_0_rgb(0,0,0)]
      transition-all duration-150 ease-in-out

      hover:bg-gray-900
      active:translate-y-[3px]
      active:shadow-[0_1px_0_rgb(0,0,0)]
    "
                >
                  This event
                </button>

                {/* Inactive */}
                <button
                  className="
      relative cursor-pointer
      px-4 pt-2 pb-1 rounded-full
      bg-gray-100 text-gray-700 text-sm font-medium

      shadow-[0_4px_0_rgb(209,213,219)]
      transition-all duration-150 ease-in-out

      hover:bg-gray-200
      active:translate-y-[3px]
      active:shadow-[0_1px_0_rgb(209,213,219)]
    "
                >
                  All
                </button>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-4 py-1.5 border dark:border-gray-300 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:text-gray-800"
                >
                  {filter === "None" ? "Minimum amount" : filter}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border text-gray-500 z-50">
                    {[
                      "None",
                      "$1",
                      "$10",
                      "$100",
                      "$1,000",
                      "$10,000",
                      "$100,000",
                    ].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setFilter(amount);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          filter === amount ? "font-medium" : ""
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="mt-4">
        {activeTab === "ideas" && (
          <>
            <div className="border rounded-2xl pb-3">
              <div className="flex items-start gap-4 w-full px-4 mt-1">
                {/* <Image
                  src="/img/user.png"
                  alt="user"
                  width={60}
                  height={60}
                  className="rounded-full mt-1"
                /> */}

                <InputTextArea
                  message={message || ""}
                  setMessage={setMessage}
                />
              </div>

              <div className=" flex flex-row pl-7 justify-between items-center">
                {selectedImage?.name ? (
                  <div className="text-xs gap-4 dark:text-gray-200 text-gray-700 items-center flex flex-row">
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

                <div className="flex justify-between w-full items-center  gap-4 mr-7">
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2 px-4 cursor-pointer dark:text-gray-300 text-gray-800"
                    >
                      <IoImageOutline size={25} className="!text-sky-600" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/gif,image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                    />
                  </div>
                  <button
                    disabled={
                      !selectedImage?.name && String(message).trim().length <= 3
                    }
                    onClick={postUserMessage}
                    className={`
                                    py-1 px-4 w-16 flex items-center justify-center rounded-md
                                    text-sm font-semibold
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
                    {false ? (
                      <CircularProgress size={18} className="!text-black" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Extra content after PredictionBox */}
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex gap-3 py-4 border-b border-gray-200 dark:border-gray-800">
                {/* Avatar */}
                <Image
                  src="https://i.pravatar.cc/40"
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
                      Holco
                    </span>
                    <span className="text-gray-400">4h</span>

                    <span className="dark:text-white font-medium">
                      Yes · Before April 1, 2026
                    </span>
                  </div>

                  {/* Message */}
                  <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                    latest update: the aircraft carriers Bush and Lincoln have
                    gone quiet. they are no longer broadcasting positions. 13
                    tankers sortied across the pond today with 8 more entourage.
                    THAAD&apos;s and patriots are being moved into theater as
                    well. F-15&apos;s arrived in Jordan
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-5 mt-3 text-gray-400">
                    <button className="hover:text-gray-600">
                      <MessageCircle size={16} />
                    </button>

                    <button className="flex items-center gap-1 hover:text-red-500">
                      <Heart size={16} />
                      <span className="text-xs">3</span>
                    </button>

                    <button className="hover:text-gray-600">
                      <Bookmark size={16} />
                    </button>

                    <button className="hover:text-gray-600">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "activity" && (
          <div className="text-gray-500 text-sm">Activity content here</div>
        )}
      </div>
    </div>
  );
}
