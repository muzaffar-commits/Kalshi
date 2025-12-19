"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@/components/Drawer/page";
import Authentication from "@/components/Pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/components/store/slice/auth";
import { getCommonCategoryAll } from "@/components/service/apiService/category";
import { saveCategory } from "@/components/store/slice/category";
import Trend from "../../../../public/img/icon/trend.png";
import ThemeToggle from "@/components/ThemeToggle";
import { useParams } from "next/navigation";
import CustomMenu from "@/components/common/CustomMenu";
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const location = useParams();
  const user = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const handleSignup = () => {
    setIsLogin(false);
    setIsOpen(true);
  };
  const handleLogin = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const logoutFun = async () => {
    dispatch(logout());
  };

  const categoryAllList = async () => {
    try {
      const response = await getCommonCategoryAll();
      if (response?.success) {
        const findOneCategory = response?.data?.categories?.[0];
        dispatch(saveCategory(findOneCategory));
        setCategoryId(findOneCategory?.id);
        setCategory(response?.data?.categories);
      } else {
        setCategory([]);
      }
    } catch (error: any) {
      setCategory([]);
    }
  };
  useEffect(() => {
    categoryAllList();
  }, []);

  return (
    <>
      <header className="w-full dark:bg-black bg-[#fff] fixed top-0 z-30">
        <div className="max-w-[1268px] mx-auto px-4">
          <div className="flex items-center justify-between py-3 relative">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#0099FF] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">X</span>
                </div>
                <h1 className="hidden md:block text-xl font-bold">
                  <span className="text-[#0099FF] ">DEMO MARKET</span>{" "}
                  <span className="text-white"></span>
                </h1>
              </div>
            </Link>
            <div className="absolute top-full left-0 w-full lg:ml-20 lg:px-4 md:static md:w-[800px] md:max-w-lg md:mx-3 mx-auto">
              <div className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center pl-3 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </span>
                {/* Input Box */}
                <input
                  type="text"
                  placeholder="Search demo market"
                  className="w-full pl-4 pr-4 py-2 rounded-md bg-[#eff3f9] 
                  text-gray-200 placeholder-gray-400 
                  focus:outline-none focus:ring-1 focus:ring-gray-200"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2 ml-auto">
              {user?.isAuth ? (
                <>
                  {/* <button
                    onClick={logoutFun}
                    className="px-4 py-1 border border-[#0099FF] text-[#0099FF] rounded-md hover:bg-[#0099FF] font-bold hover:text-white"
                  >
                    Logout
                  </button> */}
                  <CustomMenu />
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-1 border border-[#0099FF] text-[#0099FF] rounded-md hover:bg-[#0099FF] font-bold hover:text-white"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-4 py-1 rounded-md text-white font-bold 
             bg-[#0099FF]"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <ThemeToggle />
            </div>

            <Drawer buttonLabel="☰" className="cursor-pointer" />
          </div>
          <nav className="border-b pb-2 border-gray-300 w-full hidden lg:block">
            <ul className="flex  justify-start gap-10 w-full px-4 py-2 text-[15px]">
              {!location?.slug &&
                category?.map((row: any, index) => (
                  <li key={index}>
                    <div
                      onClick={() => {
                        dispatch(saveCategory(row));
                        setCategoryId(row?.id);
                      }}
                      className={` ${
                        row?.id == categoryId
                          ? "text-black"
                          : "text-[#0099FF] hover:text-black cursor-pointer"
                      } font-semibold flex items-center`}
                    >
                      {index == 0 && (
                        <span>
                          <Image
                            src={Trend}
                            width={14}
                            height={14}
                            alt="trending"
                            className="mr-1"
                          />
                        </span>
                      )}
                      {row?.name}
                    </div>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </header>
      <Authentication
        isLogin={isLogin}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Header;
