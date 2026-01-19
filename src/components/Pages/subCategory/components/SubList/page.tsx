import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function SportsMenu() {
  const [open, setOpen] = useState(null);
  const toggle = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <ul className="my-6 mt-0 space-y-4 text-sm">
      {/* FOOTBALL */}
      <li>
        <button
          onClick={() => toggle("football")}
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68]"
        >
          <span>Football</span>
          <FaAngleDown
            className={`transition-transform duration-300 ${
              open === "football" ? "rotate-180" : ""
            }`}
          />
        </button>

        {open === "football" && (
          <ul className="mt-2 ml-4 space-y-3">
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">College Football</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">College Football Playoff</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">Pro Football</li>
          </ul>
        )}
      </li>

      {/* HOCKEY */}
      <li>
        <button
          onClick={() => toggle("hockey")}
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68]"
        >
          <span>Hockey</span>
          <FaAngleDown
            className={`transition-transform duration-300 ${
              open === "hockey" ? "rotate-180" : ""
            }`}
          />
        </button>

        {open === "hockey" && (
          <ul className="mt-2 ml-4 space-y-3">
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">Ice Hockey</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">Field Hockey</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">International Hockey</li>
          </ul>
        )}
      </li>

      {/* TENNIS */}
      <li>
        <button
          onClick={() => toggle("tennis")}
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68]"
        >
          <span>Tennis</span>
          <FaAngleDown
            className={`transition-transform duration-300 ${
              open === "tennis" ? "rotate-180" : ""
            }`}
          />
        </button>

        {open === "tennis" && (
          <ul className="mt-2 ml-4 space-y-3">
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">ATP Tour</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">WTA Tour</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">Grand Slams</li>
          </ul>
        )}
      </li>

      {/* BASKETBALL */}
      <li>
        <button
          onClick={() => toggle("basketball")}
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68]"
        >
          <span>Basketball</span>
          <FaAngleDown
            className={`transition-transform duration-300 ${
              open === "basketball" ? "rotate-180" : ""
            }`}
          />
        </button>

        {open === "basketball" && (
          <ul className="mt-2 ml-4 space-y-3">
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">NBA</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">College Basketball</li>
            <li className="dark:text-gray-300 text-gray-700 hover:text-[#ba9c68] text-sm cursor-pointer">International Leagues</li>
          </ul>
        )}
      </li>

      <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>Golf</span>
          </button>
     </li>
     <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>MMA</span>
          </button>
     </li>
     <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>Baseball</span>
          </button>
     </li>
     <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>Chess</span>
          </button>
     </li>
     <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>Motorsport</span>
          </button>
     </li>
     <li>
        <button
          className="w-full flex justify-between items-center dark:text-gray-400 text-gray-700 hover:text-[#ba9c68] cursor-pointer">
          <span>Table Tennis</span>
          </button>
     </li>
    </ul>
  );
}
