
"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Drawer from "@/components/Drawer/page";
import ProfileDropdown from "@/components/profileDropdown/page";
import NotificationBell from "@/components/notification/page";
import Authentication from "@/components/Pages/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubCategory,
  getCommonCategoryAll,
} from "@/components/service/apiService/category";
import {
  changeIsEvent,
  saveCategory,
  saveEventCategory,
  saveSelectSubCategory,
  saveSubCategory,
} from "@/components/store/slice/category";

import { usePathname } from "next/navigation";
// import CustomMenu from "@/components/common/CustomMenu";
import { userBalance } from "@/components/service/apiService/user";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CategorySkeleton } from "@/utils/customSkeleton";
import { delay } from "@/utils/Content";
import { headerRootState } from "@/utils/typesInterface";

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

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const pathname = usePathname();
  const [isCategory, setIsCategory] = useState(false);
  const [eventCategory, setEventCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
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
        setSubCategory([]);
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
        setSubCategory(subCategoryResponse);
        dispatch(saveSubCategory(subCategoryResponse));
        dispatch(saveEventCategory([]));
      } else {
        setSubCategory([]);
        dispatch(saveSelectSubCategory(null));
        dispatch(saveSubCategory([]));
        dispatch(saveEventCategory([]));
        dispatch(changeIsEvent(false));
        setEventCategory([]);
      }
    } catch {
      dispatch(changeIsEvent(false));
      setSubCategory([]);
      dispatch(saveSelectSubCategory(null));
      setEventCategory([]);
      dispatch(saveSubCategory([]));
      dispatch(saveEventCategory([]));
    }
  };
  useEffect(() => {
    getSubCategory();
  }, [categoryId]);
  // saveSubCategory, saveEventCategory
  console.log(subCategory, eventCategory, "response===>subcategory");

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

  return (
    <>
   <div className="hidden lg:block">
     <header className="w-full bg-white dark:bg-[#0f172a] fixed top-0 z-30 border-b dark:border-gray-800">
  <div className="max-w-[1268px] mx-auto px-4 py-3 h-auto dark:bg-black bg-white">
<div className="flex items-center gap-6 justify-between">
    {/* LEFT: Logo */}
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image
        src="/img/opinionLogo-light.png"
        alt="Logo"
        width={80}
        height={80}
       
      />
     </Link>

    {/* CENTER: Search */}
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-200 text-gray-400" />
        <input
          type="text"
          placeholder="Search opinion kings"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-[#1e293b] text-md focus:outline-none dark:placeholder-gray-600 dark:text-gray-200 text-gray-600 placeholder-gray-400/60"
        />
      </div>
    </div>

    {/* RIGHT: Portfolio / Cash / Actions */}
    <div className="flex items-center gap-5 shrink-0">

      {/* Portfolio */}
      <div className="text-center">
        <div className="text-gray-400 text-sm">Portfolio</div>
        <div className="font-semibold text-green-600 text-md">$0.00</div>
      </div>

      {/* Cash */}
      <div className="text-center">
        <div className="text-gray-400 text-sm">Cash</div>
        <div className="font-semibold text-green-600 text-md">$0.00</div>
      </div>

      {/* Deposit */}
     
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
        Deposit
      </button>

      {/* Notification */}
     <NotificationBell/>

      {/* Profile */}
      {/* <div className="w-8 h-8 rounded-full bg-blue-400 cursor-pointer" />
    </div> */}
    <ProfileDropdown/>
   </div>
  
  </div>
  <div>
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
          {pathname === "/" && eventCategory?.length > 0 && (
            <nav className=" pb-2  border-gray-300 w-full hidden lg:block">
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
            </nav>
          )}
  </div>
  </div>
</header>
</div>

{/* MOBILE & TABLET HEADER */}
<div className="flex lg:hidden flex-col gap-2">
  
  {/* Top Row */}
  <div className="fixed top-0 z-30 border-b dark:border-gray-800 right-0 w-full bg-white dark:bg-[#0f172a] px-4 py-3">
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