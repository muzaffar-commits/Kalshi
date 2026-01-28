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
import { useRouter } from "next/navigation";

type TabName =
  | "Home"
  | "Replies"
  | "Bookmarks"
  | "Profile"
  | "Community Guidelines"
  | "Support"
  | "FAQs";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const location = window.location.pathname;
  console.log(location, "location");

  const handleMenuClick = (tab: string) => {
    router.push(tab);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle Menu"
        className="md:hidden text-white text-xl"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <ul
        className={`fixed top-0 left-0 h-full w-64 bg-[#1D293D] p-5 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-auto md:bg-transparent`}
      >
        <li className="md:hidden mb-6 flex justify-end">
          <button
            aria-label="Close Menu"
            onClick={() => setOpen(false)}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>
        </li>

        <MenuItem
          label="Home"
          icon={<FaHome />}
          active={location === "/ideas/"}
          onClick={() => handleMenuClick("/ideas")}
        />

        <MenuItem
          label="Replies"
          icon={<FaCommentAlt />}
          active={location === "/ideas/replies/"}
          onClick={() => handleMenuClick("/ideas/replies")}
        />

        <MenuItem
          label="Bookmarks"
          icon={<FaBookmark />}
          active={location === "/ideas/bookmark/"}
          onClick={() => handleMenuClick("/ideas/bookmark")}
        />

        <MenuItem
          label="Profile"
          icon={<FaUser />}
          active={location === "/ideas/profile/2/"}
          onClick={() => handleMenuClick("/ideas/profile/2")}
        />

        <MenuItem
          label="Community Guidelines"
          icon={<FaUsers />}
          active={location === "/ideas/community-guidelines/"}
          onClick={() => handleMenuClick("/ideas/community-guidelines")}
        />

        <MenuItem
          label="Support"
          icon={<FaHeadset />}
          active={location === "/ideas/support/"}
          onClick={() => handleMenuClick("/ideas/support")}
        />

        <MenuItem
          label="FAQs"
          icon={<FaQuestionCircle />}
          active={location === "/ideas/faq/"}
          onClick={() => handleMenuClick("/ideas/faq")}
        />

        {/* CTA Button */}
        <li className="mt-6 w-56">
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="block text-center bg-blue-500 hover:bg-blue-500/80
            py-2 px-4 text-white rounded font-semibold"
          >
            Post
          </Link>
        </li>
      </ul>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function MenuItem({ icon, label, active, onClick }: MenuItemProps) {
  return (
    <li onClick={onClick} className="my-4 cursor-pointer text-sm select-none">
      <span
        className={`flex items-center gap-3 transition-colors
        ${active ? "dark:text-white text-black font-semibold" : "text-gray-500 dark:hover:text-gray-400 hover:text-gray-400"}`}
      >
        <span className="text-base">{icon}</span>
        {label}
      </span>
    </li>
  );
}
