"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@/components/Drawer/page";
import Authentication from "@/components/Pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/components/store/slice/auth";
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state?.user);

  console.log(user, "user===>");

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

  return (
    <>
      <header className="w-full bg-[#0f172a] fixed top-0">
        {/* Wrapper limited to 1440px */}
        <div className="max-w-[1268px] mx-auto px-4">
          <div className="flex items-center justify-between py-3 relative">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">X</span>
                </div>
                <h1 className="hidden md:block text-xl font-bold">
                  <span className="text-purple-400">DEMO</span>{" "}
                  <span className="text-white">MARKET</span>
                </h1>
              </div>
            </Link>

            {/* Searchbar */}
            <div className="absolute top-full left-0 w-full lg:px-4 md:static md:w-auto md:max-w-lg md:mx-6">
              <div className="relative">
                {/* Search Icon */}
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
                  className="w-full pl-4 pr-4 py-2 rounded-md bg-[#1e293b] 
                  text-gray-200 placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2">
              {user?.isAuth ? (
                <button
                  onClick={logoutFun}
                  className="px-4 py-1 hover:cursor-pointer border border-purple-500 rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-1 hover:cursor-pointer border border-purple-500 rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-4 py-1 hover:cursor-pointer rounded-md text-white font-bold 
             bg-gradient-to-r from-purple-500 to-pink-500 
             hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-500"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Hamburger Icon */}
            <Drawer buttonLabel="☰" className="cursor-pointer" />
          </div>

          {/* Navigation Links */}
          <nav className="border-b pb-2 border-gray-700 w-full hidden lg:block">
            <ul className="flex flex-wrap justify-evenly w-full px-4 py-2 text-[16px]">
              <li>
                <a
                  href="#"
                  className="text-purple-400 font-semibold flex items-center"
                >
                  <span>
                    <Image
                      src="/img/icon/trend.png"
                      width={14}
                      height={14}
                      alt="trending"
                      className="mr-1"
                    />
                  </span>
                  Trending
                </a>
              </li>
              <li>
                <Link
                  href="/blockdetail"
                  className="text-[#8D9CB1] hover:text-purple-400"
                >
                  New
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Politics
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Culture
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  World
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Economy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Financials
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Tech & Science
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Health
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Crypto
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Trump
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  More
                </a>
              </li>
            </ul>
          </nav>

          {/* Sub Navigation */}
          <nav className="w-full hidden lg:block">
            <ul className="flex flex-wrap justify-evenly w-full px-4 py-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white font-semibold flex items-center px-4 py-1 rounded-xl
             bg-gradient-to-r from-purple-500 to-pink-500
             hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-500
             transition-all duration-300"
                >
                  All
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Breaking News
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Trump-Putin
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Trump-Khamenei
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Trump Presidency
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Israel
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Ukraine
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  IPOs
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  Tariffs
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  ED Sheeran
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  NYC Mayor
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  CEO Politics
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8D9CB1] hover:text-purple-400">
                  GPT-5
                </a>
              </li>
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
