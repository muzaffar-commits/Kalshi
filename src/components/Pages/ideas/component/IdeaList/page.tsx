"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaCommentAlt,
  FaBookmark,
  FaUser,
  FaUsers,
  FaHeadset,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="md:hidden text-white text-xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <ul
        className={`fixed top-0 lg:pl-0 left-0 h-full w-64 bg-[#0f172a] p-5 transform transition-transform duration-300 z-50
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-auto md:bg-transparent`}
      >
        <li className="md:hidden mb-6">
          <button onClick={() => setOpen(false)} className="text-white text-xl">
            <FaTimes />
          </button>
        </li>
        <MenuItem icon={<FaHome />} label="Home" />
        <MenuItem icon={<FaCommentAlt />} label="Replies" />
        <MenuItem icon={<FaBookmark />} label="Bookmarks" />
        <MenuItem icon={<FaUser />} label="Profile" />
        <MenuItem icon={<FaUsers />} label="Community Guidelines" />
        <MenuItem icon={<FaHeadset />} label="Support" />
        <MenuItem icon={<FaQuestionCircle />} label="FAQs" />
        <Link
          href="#"
          className="bg-[#c8aa76] hover:bg-[#c8aa76]/80 py-2 px-4 text-md text-black rounded mt-3 lg:w-1/2 w-full lg:inline-block block text-center font-semibold"
        >
          Post
        </Link>
      </ul>
    </div>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="my-4 text-sm">
      <a
        href="#"
        className="flex items-center gap-3 dark:text-gray-300 text-gray-700 dark:hover:text-[#c8aa76] hover:text-[#c8aa76]"
      >
        <span className="text-base">{icon}</span>
        {label}
      </a>
    </li>
  );
}
