"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Drawer from "@/components/Drawer/page";
import Authentication from "@/components/Pages/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubCategory,
  getCommonCategoryAll,
} from "@/components/service/apiService/category";
import {
  changeFilter,
  changeIsEvent,
  saveCategory,
  saveEventCategory,
  saveSelectSubCategory,
  saveSubCategory,
} from "@/components/store/slice/category";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import CustomMenu from "@/components/common/CustomMenu";
import { userBalance } from "@/components/service/apiService/user";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CategorySkeleton } from "@/utils/customSkeleton";
import { delay } from "@/utils/Content";
import { headerRootState } from "@/utils/typesInterface";
import { FiBookmark, FiChevronDown, FiSearch, FiSliders } from "react-icons/fi";
import { CustomToggle } from "@/components/common/CustomToggle";
import { SlArrowDown } from "react-icons/sl";
import ProfileDropdown from "@/components/profileDropdown/page";
import NotificationBell from "@/components/notification/page";

interface Category {
  id: number;
  name: string;
}

interface UserBalanceResponse {
  success: boolean;

  data?: {
    balance: string | number;
  };
}

const frequencies = ["all", "daily", "weekly", "monthly"];
const statusList = ["Active", "Resolved"];
const sortOptions = [
  "volume_24h",
  "volume_total",
  "competitive",
  "ending_soon",
  "newest",
];

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const pathname = usePathname();
  const [isCategory, setIsCategory] = useState(false);
  const [eventCategory, setEventCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequency, setFrequency] = useState("all");
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState("Active");
  const [openSort, setOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [hideFilter, setHideFilter] = useState({
    sports: false,
    crypto: false,
    earnings: false,
  });

  const user = useSelector((state: headerRootState) => state?.user);
  const dispatch = useDispatch();
  const handleSignup = () => {
    setIsLogin(false);
    setIsOpen(true);
  };
  const handleLogin = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const categoryAllList = useCallback(async () => {
    setIsCategory(true);
    try {
      const [response] = await Promise.all([
        getCommonCategoryAll(),
        delay(1000),
      ]);
      if (response.success && response.data?.categories?.length) {
        const firstCategory = response.data.categories[0];
        dispatch(saveCategory(firstCategory));
        setCategoryId(firstCategory.id);
        setCategory(response.data.categories);
      } else {
        setCategory([]);
      }
    } catch {
      setCategory([]);
    } finally {
      setIsCategory(false);
    }
  }, [dispatch]);

  useEffect(() => {
    categoryAllList();
  }, [categoryAllList]);

  const getSubCategory = async () => {
    try {
      const response = await fetchSubCategory(Number(categoryId));

      if (response.success && !response?.data?.isMultiple) {
        const subCategoryList = response?.data?.category?.event_section || [];
        setEventCategory(subCategoryList);

        dispatch(saveSelectSubCategory(null));
        dispatch(saveEventCategory(subCategoryList));
        dispatch(changeIsEvent(false));
        dispatch(saveSubCategory([]));
      } else if (response.success && response?.data?.isMultiple) {
        const subCategoryResponse =
          response?.data?.category?.sub_category || [];
        setEventCategory([]);
        dispatch(changeIsEvent(true));
        dispatch(saveSelectSubCategory(null));

        dispatch(saveSubCategory(subCategoryResponse));
        dispatch(saveEventCategory([]));
      } else {
        dispatch(saveSelectSubCategory(null));
        dispatch(saveSubCategory([]));
        dispatch(saveEventCategory([]));
        dispatch(changeIsEvent(false));
        setEventCategory([]);
      }
    } catch {
      dispatch(changeIsEvent(false));

      dispatch(saveSelectSubCategory(null));
      setEventCategory([]);
      dispatch(saveSubCategory([]));
      dispatch(saveEventCategory([]));
    }
  };
  useEffect(() => {
    getSubCategory();
  }, [categoryId]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const getUserBalance = async () => {
    try {
      const response: UserBalanceResponse = await userBalance();

      if (response.success && response.data?.balance !== undefined) {
        localStorage.setItem("balance", String(response.data.balance));
      } else {
        localStorage.removeItem("balance");
      }
    } catch {
      localStorage.removeItem("balance");
    }
  };
  useEffect(() => {
    if (token) {
      getUserBalance();
    }
  }, [token]);

  const handleFilter = () => {
    setIsFilter(!isFilter);
  };

  const handleCleanFilter = () => {
    // setHideFilter([]);
    setFrequency("All");
    setStatus("Active");
    setSortBy("Newest");
  };
  const toggleFilter = (key: keyof typeof hideFilter) => {
    setHideFilter((prev) => {
      const newValue = !prev[key];

      dispatch(
        changeFilter({
          key: "hideFilter",
          subKey: key,
          value: newValue,
        }),
      );

      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  console.log(hideFilter, "hideFilter");

  return (
    <>
      <div className="hidden lg:block">
        <header className="w-full bg-white dark:bg-[#1D293D] fixed top-0 z-30 ">
          <div className="max-w-[1268px] mx-auto px-4 py-3 h-auto dark:bg-[#1D293D] bg-white">
            <div
              className={`flex items-center justify-between px-4 ${
                pathname === "/"
                  ? ""
                  : "border-b dark:border-gray-800 border-gray-300"
              }`}
            >
              {/* LEFT: Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  src="/img/opinionLogo-light.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </Link>

              {/* CENTER: Search */}
              <div className="w-full max-w-xl mx-6">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-200 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opinion kings"
                    className="w-full pl-10 pr-4 py-2 dark:text-gray-300 text-gray-700 rounded-full bg-gray-100 dark:bg-gray-700 text-md focus:outline-none"
                  />
                </div>
              </div>

              {/* RIGHT: Actions */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-center">
                  <div className="text-gray-400 text-sm">Portfolio</div>
                  <div className="font-semibold text-green-600">$0.00</div>
                </div>

                <div className="text-center">
                  <div className="text-gray-400 text-sm">Cash</div>
                  <div className="font-semibold text-green-600">$0.00</div>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                  Deposit
                </button>

                <NotificationBell />
                <ProfileDropdown />

                {!user?.isAuth && (
                  <>
                    <button
                      onClick={handleLogin}
                      className="px-4 py-2 text-[#c7ac77] font-semibold hover:bg-[#c7ac77]/40 rounded-md"
                    >
                      Log In
                    </button>
                    <button
                      onClick={handleSignup}
                      className="px-4 py-2 bg-[#c7ac77] text-white rounded-md font-semibold"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>

            {pathname === "/" && (
              <nav className="border-b pb-2 dark:border-gray-800 border-gray-300 w-full hidden lg:block">
                <ul className="flex justify-start gap-10 w-full px-4 py-2 text-[15px]">
                  {isCategory ? (
                    <CategorySkeleton />
                  ) : (
                    category?.map((row: Category, index: number) => (
                      <li key={index}>
                        <div
                          onClick={() => {
                            dispatch(saveCategory(row));
                            dispatch(saveSelectSubCategory(null));
                            setCategoryId(row?.id);
                            dispatch(changeIsEvent(false));
                          }}
                          className={` ${
                            row?.id == categoryId
                              ? "text-black dark:text-[#c7ac77]"
                              : "dark:text-gray-300 text-[#5e5e5f] hover:text-[#c7ac77]  cursor-pointer"
                          } font-semibold flex items-center`}
                        >
                          {index == 0 && (
                            <span>
                              <FaArrowTrendUp className="mr-1" />
                            </span>
                          )}
                          {row?.name}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </nav>
            )}

            <div className="">
              <nav className=" pb-2 flex flex-row pt-1.5  border-gray-300 w-full ">
                <div className="border-r border-gray-700 pr-6 flex items-center gap-2">
                  <div className="flex items-center w-56 gap-2 dark:bg-gray-700 bg-gray-100 rounded-xl px-4 py-2">
                    <FiSearch className="text-gray-400 text-base" />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        dispatch(
                          changeFilter({
                            key: "search",
                            value: e.target.value,
                          }),
                        );
                      }}
                      placeholder="Search"
                      className="w-full bg-transparent outline-none text-sm  text-gray-200 placeholder-gray-400"
                    />
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl dark:bg-gray-700 bg-gray-100 hover:bg-[#273244] transition">
                    <FiSliders
                      className="text-gray-500 text-lg dark:text-gray-200"
                      onClick={handleFilter}
                    />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl dark:bg-gray-700 bg-gray-100 hover:bg-[#273244] transition">
                    <FiBookmark className="text-gray-500 text-lg dark:text-gray-200" />
                  </button>
                </div>

                {pathname === "/" && eventCategory?.length > 0 && (
                  <ul className="flex justify-start gap-10 w-full px-4 py-2 text-[15px]">
                    <li>
                      <div
                        onClick={() => {
                          dispatch(saveSelectSubCategory(null));
                          setSubCategoryId(null);
                        }}
                        className={` ${
                          subCategoryId == null
                            ? "text-black dark:text-[#c7ac77]"
                            : "dark:text-gray-300 text-[#5e5e5f] hover:text-[#c7ac77]  cursor-pointer"
                        } font-semibold flex items-center`}
                      >
                        <span>
                          <FaArrowTrendUp className="mr-1" />
                        </span>
                        All
                      </div>
                    </li>
                    {eventCategory?.map((row: Category, index: number) => (
                      <li key={index}>
                        <div
                          onClick={() => {
                            dispatch(saveSelectSubCategory(row));
                            setSubCategoryId(row?.id);
                          }}
                          className={` ${
                            row?.id == subCategoryId
                              ? "text-black dark:text-[#c7ac77]"
                              : "dark:text-gray-300 text-[#5e5e5f] hover:text-[#c7ac77]  cursor-pointer"
                          } font-semibold flex items-center`}
                        >
                          {row?.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </nav>

              {isFilter && (
                <div className="w-full flex flex-wrap items-center gap-2 bg-transparent pb-5 rounded-xl">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenSort((prev) => !prev)}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-gray-700 bg-gray-100 text-xs dark:text-gray-300 text-gray-700 hover:bg-[#273244]/10 transition"
                    >
                      <span className="text-gray-400 text-xs">Sort by:</span>
                      <span className="dark:text-white text-black font-medium">
                        {sortBy}
                      </span>
                      <SlArrowDown
                        size={10}
                        className={`transition-transform ${
                          openSort ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openSort && (
                      <div className="absolute left-0 mt-2 w-44 rounded-lg bg-[#1D293D] border border-gray-700 shadow-lg z-50">
                        {sortOptions.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setSortBy(item);
                              dispatch(
                                changeFilter({
                                  key: "sortBy",
                                  value: item,
                                }),
                              );
                              setOpenSort(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition
            ${
              sortBy === item
                ? "bg-[#1f2937] text-sky-400"
                : "text-gray-300 hover:bg-[#1f2937]"
            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenFrequency((prev) => !prev)}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-gray-700 bg-gray-100 text-xs dark:text-gray-300 text-gray-700 hover:bg-[#273244]/10 transition"
                    >
                      <span className="text-gray-400">Frequency:</span>
                      <span className="dark:text-gray-300 text-gray-700 w-10 font-medium">
                        {frequency}
                      </span>
                      <SlArrowDown
                        size={10}
                        className={`transition ${openFrequency ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFrequency && (
                      <div className="absolute overflow-hidden left-0 mt-2 w-36 rounded-lg bg-[#1D293D] border border-gray-700 shadow-lg z-50">
                        {frequencies.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setFrequency(item);
                              dispatch(
                                changeFilter({
                                  key: "frequencies",
                                  value: item,
                                }),
                              );
                              setOpenFrequency(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition
            ${
              frequency === item
                ? "bg-[#1f2937] text-sky-400"
                : "dark:text-gray-300 text-gray-700 hover:bg-[#1f2937]"
            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative inline-block">
                    {/* Status Button */}
                    <button
                      onClick={() => setOpenStatus((prev) => !prev)}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-gray-700 bg-gray-100 text-xs dark:text-gray-300 text-gray-700 hover:bg-[#273244]/10 transition"
                    >
                      <span className="text-gray-400">Status:</span>
                      <span className="dark:text-gray-300 text-gray-700  font-medium">
                        {status}
                      </span>
                      <SlArrowDown
                        size={10}
                        className={`transition ${openStatus ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown */}
                    {openStatus && (
                      <div className="absolute left-0 mt-2 w-36 rounded-lg bg-[#1D293D] border border-gray-700 shadow-lg z-50">
                        {statusList.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setStatus(item);
                              dispatch(
                                changeFilter({
                                  key: "status",
                                  value: item,
                                }),
                              );
                              setOpenStatus(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition
            ${
              status === item
                ? "bg-[#1f2937] text-sky-400"
                : "dark:text-gray-300 text-gray-800 hover:bg-[#1f2937]"
            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <CustomToggle
                    label="Hide sports?"
                    checked={hideFilter.sports}
                    onChange={() => toggleFilter("sports")}
                  />

                  <CustomToggle
                    label="Hide crypto?"
                    checked={hideFilter.crypto}
                    onChange={() => toggleFilter("crypto")}
                  />

                  <CustomToggle
                    label="Hide earnings?"
                    checked={hideFilter.earnings}
                    onChange={() => toggleFilter("earnings")}
                  />

                  <button
                    onClick={handleCleanFilter}
                    className="!text-xs text-gray-400 hover:bg-gray-800 !px-4 py-1.5 rounded-full hover:underline cursor-pointer hover:!text-gray-300 hover:text-gray-300"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* MOBILE & TABLET HEADER */}
      <div className="flex lg:hidden flex-col gap-2">
        {/* Top Row */}
        <div className="fixed top-0 z-30 border-b dark:border-gray-800 right-0 w-full bg-white dark:bg-[#1D293D] px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* <button className="text-xl">☰</button> */}

              <Link href="/">
                <Image
                  src="/img/opinionLogo-light.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
            </div>

            {/* Right: Notification + Profile */}
            <div className="flex items-center gap-4">
              <NotificationBell />
              <ProfileDropdown />
            </div>
          </div>

          {/* Search Row */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opinion kings"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-[#1e293b] focus:outline-none text-sm dark:placeholder-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <Authentication
        isLogin={isLogin}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Header;
