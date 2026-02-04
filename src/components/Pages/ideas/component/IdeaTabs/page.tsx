"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { LuUpload } from "react-icons/lu";
import {
  FaRegCommentAlt,
  FaRegBookmark,
  FaRegHeart,
  FaRegClock,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import InputTextArea from "./InputTextArea";
import { imageUpload, userPost } from "@/components/service/apiService/user";
import {
  PostFeeBack,
  SetPosts,
  TabPanelProps,
  UploadedImage,
} from "@/utils/typesInterface";
import IdeaTabsTwo from "../IdeaTabsTwo/page";
import { IoImageOutline } from "react-icons/io5";
import { CreatePostSkeleton } from "@/utils/customSkeleton";
import socket from "@/components/socket";
import { delay, timeAgoCompact, truncateValue } from "@/utils/Content";
import { Activity, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { GrCloudUpload } from "react-icons/gr";
import GiphyModal from "@/components/Pages/detail/component/postList/GiphyModal";

type HandleComment = (post: PostFeeBack) => void;

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IdeaTabsProps {
  allPosts: PostFeeBack[];
  fetchPostList: () => void;
  setAllPosts: SetPosts;
  handleComment: HandleComment;
  isLoader: boolean;
  handleUserDetails: (id: string) => void;
}

export default function IdeaTabs({
  allPosts,
  fetchPostList,
  setAllPosts,
  handleComment,
  isLoader,
  handleUserDetails,
}: IdeaTabsProps) {
  const [value, setValue] = React.useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = React.useState<string | null>("");
  const [isPostLoader, setIsPostLoader] = React.useState<boolean>(false);
  const [liveTrades, setLiveTrades] = useState<any>([]);
  const [isImageUploadLoader, setIsImageUploadLoader] = useState(false);
  const [gif, setGif] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const chooseImages = async (file: File) => {
    setIsImageUploadLoader(true);
    try {
      const formData = new FormData();
      formData.append("images", file);
      const [response] = await Promise.all([
        imageUpload(formData),
        delay(1000),
      ]);
      if (response?.success) {
        setGif(response?.data?.[0]?.url);
      } else {
        toast.error(response?.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsImageUploadLoader(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    chooseImages(file);
  };

  const postUserMessage = async () => {
    setIsPostLoader(true);
    try {
      const metadata = {
        content: message,
        images: gif == null ? [] : [gif],
      };
      const response = await userPost({ metadata });

      if (response?.reponse?.status) {
        setMessage("");
        fetchPostList();
        setIsPostLoader(false);
        setGif(null);
      } else {
        toast.error(response?.reponse?.status);
        setMessage("");
        setIsPostLoader(false);
        setGif(null);
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

  useEffect(() => {
    socket.emit("subscribeLiveTrade");
    const handleTradeLive = (payload: any) => {
      setLiveTrades((prev: any[]) => [payload, ...prev]);
    };
    socket.on("tradeLive", handleTradeLive);
    return () => {
      socket.emit("unsubscribeLiveTrade");
      socket.off("tradeLive", handleTradeLive);
    };
  }, []);

  const goToQuestionDetails = (id: string) => {
    router.push(`/market/${id}`);
  };

  return (
    <Box sx={{ width: "100%", borderRight: 1, borderColor: "#364153" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "var(--color-borderdark)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="time filter tabs"
          sx={{
            "& .MuiTab-root": {
              color: "#80899b",
              textTransform: "none",
              fontWeight: 500,
            },
            "& .Mui-selected": {
              color: "#8160ee",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#8160ee",
            },
          }}
        >
          <Tab label="Ideas" {...a11yProps(0)} />
          <Tab label="Live Trades" {...a11yProps(1)} />
          {/* <Tab label="Market Builder" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className="">
          {isLoader ? (
            <CreatePostSkeleton />
          ) : (
            <div>
              <div className="flex items-start gap-4 w-full px-4 mt-4">
                <Image
                  src="/img/user.png"
                  alt="user"
                  width={60}
                  height={60}
                  className="rounded-full mt-1"
                />

                <InputTextArea
                  message={message || ""}
                  setMessage={setMessage}
                  image={gif || ""}
                  onRemoveImage={() => setGif("")}
                />
              </div>

              <div className=" flex flex-row pl-7 justify-between items-center">
                <div></div>

                <div className="flex items-center justify-end gap-8 mr-7">
                  <div
                    className={`relative inline-block ${gif ? "" : "group"} `}
                  >
                    <button
                      disabled={gif || isImageUploadLoader ? true : false}
                      type="button"
                      className={`text-sm relative font-medium ${gif || isImageUploadLoader ? "text-gray-400 dark:text-gray-700  " : "text-gray-500 cursor-pointer  hover:text-[#d2b8fa]"}  
                    `}
                    >
                      {isImageUploadLoader && (
                        <div className="absolute left-3 flex items-center justify-center">
                          <CircularProgress
                            className="!text-gray-400 dark:!text-white/50"
                            size={25}
                          />
                        </div>
                      )}
                      UPLOAD
                    </button>
                    <div
                      className="
                              absolute -left-8 mt-2 w-32
                              rounded-xl bg-white dark:bg-[#0F172A]
                              shadow-xl border border-gray-200 dark:border-gray-700
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              translate-y-2 group-hover:translate-y-0
                              transition-all duration-200 z-50
                            "
                    >
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-b border-gray-200 dark:border-gray-600 flex cursor-pointer items-center gap-2 text-left px-4 py-2 text-sm
                     text-gray-700 dark:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     rounded-t-xl"
                      >
                        <GrCloudUpload className="text-sky-500" /> Image
                      </button>

                      <button
                        onClick={() => setOpen(true)}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm
                     text-gray-700 dark:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     rounded-b-xl"
                      >
                        <Gift size={18} className="!text-[#8160EE]" /> GIF
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/gif,image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                  />
                  <button
                    disabled={gif && String(message).trim().length <= 3}
                    onClick={postUserMessage}
                    className={`
                        py-1 px-4 w-16 flex items-center justify-center rounded-md
                        text-sm font-semibold
                        transition-all duration-200
                        ${
                          gif || String(message).trim().length > 3
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
                      <CircularProgress size={18} className="!text-black" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-t dark:border-gray-700 border-gray-200 mt-3">
            <IdeaTabsTwo
              handleComment={handleComment}
              postedList={allPosts}
              setAllPosts={setAllPosts}
              isBookMark={false}
              loader={isLoader}
              handleUserDetails={handleUserDetails}
            />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {liveTrades?.length > 0 ? (
          liveTrades?.map((row: any, index: number) => (
            <div
              key={index}
              className="p-3 border-b dark:border-gray-700 border-gray-200"
            >
              <div className="flex justify-between">
                <div className="md:flex justify-start gap-4">
                  <div>
                    {" "}
                    <Image
                      src={row?.imageUrl || "/img/user.png"}
                      alt="user"
                      width={70}
                      height={70}
                      className="rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <p className="dark:text-gray-400 text-gray-800 text-sm">
                      {row?.username || "unknown"}
                    </p>
                    <p className="text-md mt-4">
                      <>
                        <span className="cursor-pointer text-[#c8aa76]">
                          {row?.option?.optionContent}:{" "}
                          <span
                            onClick={() =>
                              goToQuestionDetails(row?.question?.id)
                            }
                            className="dark:text-gray-200 hover:underline text-gray-800"
                          >
                            {row?.question?.question || "--"}
                          </span>{" "}
                        </span>
                      </>
                    </p>
                    <p className="text-sm dark:text-gray-500 text-gray-600">
                      ${truncateValue(row?.question?.liquidity || 0)}
                    </p>
                  </div>
                </div>
                <div className="dark:text-gray-500 text-gray-400 text-sm">
                  {timeAgoCompact(row?.ts)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
              <Activity className="text-3xl text-gray-500 dark:text-gray-400" />
            </div>

            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
              No Live Trades Yet
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Trades will appear here as soon as market activity begins. Stay
              tuned for real-time updates.
            </p>
          </div>
        )}
        {/* 
        <div className="p-3 border-b dark:border-gray-700 border-gray-200">
          <div className="flex justify-between">
            <div className="md:flex justify-start gap-4">
              <div>
                {" "}
                <Image
                  src="/img/nick.jpg"
                  alt="user"
                  width={70}
                  height={70}
                  className="rounded-md mt-1"
                />
              </div>
              <div>
                <p className="dark:text-gray-400 text-gray-800 text-sm">
                  Majchrzak vs Opelka
                </p>
                <p className="text-md mt-4">
                  <Link href="/">
                    <span className="cursor-pointer text-[#c8aa76]">
                      Bought YES:{" "}
                      <span className="dark:text-gray-200 text-gray-800">
                        Reilly Opelka
                      </span>{" "}
                    </span>
                  </Link>
                </p>
                <p className="text-sm dark:text-gray-500 text-gray-600">
                  100 contracts (28
                  <FaCentSign className="inline-block text-xs" />)
                </p>
              </div>
            </div>
            <div className="dark:text-gray-500 text-gray-400 text-sm">2m</div>
          </div>
        </div> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="border-b border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)] pb-3">
          <div className="flex items-start gap-4 w-full px-4 mt-4">
            <Image
              src="/img/user.png"
              alt="user"
              width={60}
              height={60}
              className="rounded-full mt-1"
            />

            <textarea
              rows={2}
              placeholder="Your market title"
              className="pt-4
              flex-1
              min-h-[80px]
              text-md
              leading-relaxed
              bg-transparent
              border-0
              resize-none
              outline-none
              focus:outline-none
              focus:ring-0
              dark:text-gray-400
              text-gray-900
              dark:placeholder-gray-600
              placeholder-gray-300
            "
            />
          </div>

          <div className="flex justify-end gap-4 mr-7">
            <button className="py-2 px-4 cursor-pointer dark:text-gray-300 text-gray-800">
              GIF
            </button>
            <button className="py-2 px-4 cursor-not-allowed bg-gray-700 text-gray-400 rounded-md">
              Next
            </button>
          </div>
        </div>
        <div className="p-3 border-b border-[var(--color-borderlight)] dark:border-[var(--color-borderdark)]">
          <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
            <div>
              <Image
                src="/img/nick.jpg"
                alt="user"
                width={110}
                height={110}
                className="rounded-md mt-1"
              />
            </div>
            <div>
              <h4>
                <a
                  href="#"
                  className="dark:text-gray-300 hover:underline font-semibold text-gray-700"
                >
                  riggs916
                </a>{" "}
                <span className="text-xs dark:text-gray-500 text-gray-500">
                  17m
                </span>
              </h4>
              <p className="text-md mt-2 dark:text-gray-400 text-gray-800 mb-2">
                Who will be a guest on The Joe Rogan Experience?
              </p>
              <p className="dark:text-gray-500 text-gray-500">
                I would like to bet on whether or not people like Jeff Bezos,
                Nick Fuentes, Bryan Cranston, etc. will appear on JRE. This
                lines up nicely with current events like sports, politics, tech,
                entertainment, etc.
              </p>
              <div className="border-b border-t py-2 mt-3 dark:border-gray-700 border-gray-200">
                <span className="text-gray-500 text-sm">
                  Status{" "}
                  <span className="dark:text-gray-300 text-gray-800">
                    Pending review <FaRegClock className="inline-block" />
                  </span>
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <div className="flex md:gap-3 gap-2 items-center">
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
                      <FaRegCommentAlt />
                    </span>
                    <span className="inline-block relative -left-3 font-light text-gray-400">
                      3
                    </span>

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
            ease-in-out text-xl cursor-pointer
          "
                    >
                      <FaRegHeart />
                    </span>
                    <span className="inline-block relative -left-3 font-light text-gray-400">
                      3
                    </span>
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
                      <FaRegBookmark />
                    </span>
                    <span className="inline-block relative -left-3 font-light text-gray-400">
                      3
                    </span>
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
        </div>
      </CustomTabPanel>
      <GiphyModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={setGif}
      />
    </Box>
  );
}
