import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import Drawer from '@/components/Drawer/page';
import Trend from '../../../../public/img/icon/trend.png';
const Header = () => {
  return (
    <>
       <header className="w-full bg-[#fff] fixed top-0 z-30">
      {/* Wrapper limited to 1440px */}
      <div className="max-w-[1268px] mx-auto px-4">
        <div className="flex items-center justify-between py-3 relative">
          {/* Logo */}
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

          {/* Searchbar */}
          <div className="absolute top-full left-0 w-full lg:ml-20 lg:px-4 md:static md:w-[800px] md:max-w-lg md:mx-3 mx-auto">
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
                className="w-full pl-4 pr-4 py-2 rounded-md bg-[#eff3f9] 
                  text-gray-200 placeholder-gray-400 
                  focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-2 ml-auto">
            <button className="px-4 py-1 border border-[#0099FF] text-[#0099FF] rounded-md hover:bg-[#0099FF] font-bold hover:text-white">
              Log In
            </button>
         <button
  className="px-4 py-1 rounded-md text-white font-bold 
             bg-[#0099FF]"
>
  Sign Up
</button>

          </div>

          {/* Hamburger Icon */}
          <Drawer buttonLabel="☰" className="cursor-pointer"/></div>

        {/* Navigation Links */}
          <nav className="border-b pb-2 border-gray-300 w-full hidden lg:block">
            <ul className="flex flex-wrap justify-evenly w-full px-4 py-2 text-[15px]">
              <li>
                <a
                  href="#" className="text-black font-semibold flex items-center">
                  <span>
                    <Image
                      src={Trend}
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
              <Link href="/blockdetail" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  New
              </Link>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Politics
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Culture
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  World
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Economy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Financials
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Tech & Science
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Health
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Crypto
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  Trump
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                  More
                </a>
              </li>
            </ul>
          </nav>

        {/* Sub Navigation */}
        <nav className="w-full hidden lg:block">
          <ul className="flex flex-wrap justify-evenly w-full px-4 py-2 text-sm">
            <li>
            <a href="#" className="text-black/70 font-semibold flex items-center px-4 py-1 rounded-xl
             bg-[#0099FF]/30 hover:bg-gradient-to-l hover:cyan-500
             transition-all duration-300">All</a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Breaking News
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Trump-Putin
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Trump-Khamenei
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Trump Presidency
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Putin
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Ukraine
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                IPOs
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                Tariffs
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                ED Sheeran
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                NYC Mayor
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                CEO Politics
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6a6b6c] hover:text-[#0099FF]">
                GPT-5
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </>
  )
}

export default Header