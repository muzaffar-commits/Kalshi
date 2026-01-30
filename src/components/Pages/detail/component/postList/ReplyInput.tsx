import { PROFESSIONAL_EMOJIS } from "@/components/content";
import React, { useState } from "react";

export default function ReplyInput({
  rows,
  replyText,
  setReplyText,
  handleComment,
  insertEmoji,
  textareaRef,
  handleKeyDown,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 relative w-full flex items-center gap-3 dark:bg-[#1D293D] border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-sky-500/40">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex-shrink-0" />
      <input
        ref={textareaRef}
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder={`Reply to ${rows?.User?.username || "--"}`}
        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
        onKeyDown={(e) => handleKeyDown(e, rows)}
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-1
          text-gray-500 hover:text-gray-800
          dark:text-gray-400 dark:hover:text-white
          text-lg
          px-2 py-1
          rounded-md
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition
        "
      >
        🙂
      </button>
      <button
        disabled={replyText.trim().length < 2}
        className={`text-sm font-medium transition ${
          replyText.trim().length >= 2
            ? "text-sky-400 hover:text-sky-300 cursor-pointer"
            : "text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => handleComment(rows)}
      >
        Reply
      </button>

      {open && (
        <div
          className="
            absolute right-0 bottom-[110%]
            w-72
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            shadow-xl
            rounded-lg
            p-3
            flex flex-wrap gap-2
            z-20
          "
        >
          {PROFESSIONAL_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => insertEmoji(emoji)}
              className="
                  text-xl
                  rounded-md
                  p-2
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  transition
                "
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
