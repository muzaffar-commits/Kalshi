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
import { timeAgoCompact, truncateValue } from "@/utils/Content";
import { Activity } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<
    UploadedImage[] | null
  >(null);
  const [message, setMessage] = React.useState<string | null>("");
  const [isPostLoader, setIsPostLoader] = React.useState<boolean>(false);
  const [liveTrades, setLiveTrades] = useState<any>([]);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        fetchPostList();
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

  useEffect(() => {
    console.log(socket.connected, "isConnnnnnnnn");

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
    <Box sx={{ width: "100%" }}>
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
              color: "#beaff0",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#6f59b6",
            },
          }}
        >
          <Tab label="Ideas" {...a11yProps(0)} />
          <Tab label="Live Trades" {...a11yProps(1)} />
          {/* <Tab label="Market Builder" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div>
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

                <div className="flex justify-end gap-4 mr-7">
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
    </Box>
  );
}
