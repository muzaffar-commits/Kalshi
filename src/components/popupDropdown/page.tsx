"use client";
import { useEffect, useRef, useState } from "react";
import { FaBolt, FaBullseye } from "react-icons/fa";

interface Props {
  label?: string;
  onSelect?: (value: string) => void;
}

export default function Dropdown({ label = "Limit", onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label); // 👈 keep track of selected value
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const choose = (val: string, text: string) => {
    setSelected(text); // 👈 update selected
    setOpen(false);
    onSelect?.(val);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div className="flex flex-row gap-1 items-center">
        <span className="text-black text-sm">Order Type :</span>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex items-center capitalize justify-between gap-2 text-gray-600 w-24 text-sm bg-gray-100 px-3 py-2 hover:bg-gray-50"
        >
          {selected}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="stroke-gray-700"
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-xl shadow-black/50 z-20">
          <div role="menu" className="flex flex-col py-2">
            <MenuItem
              label="Market"
              onClick={() => choose("dollars", "market")}
            >
              <FaBolt className="mt-1 text-yellow-400 " />
            </MenuItem>
            <MenuItem
              label="Limit"
              onClick={() => choose("contracts", "limit")}
            >
              <FaBullseye className="mt-1 text-blue-500" />
            </MenuItem>
            {/* <MenuItem
              label="Limit order"
              onClick={() => choose("limit", "Limit order")}
            >
              <LimitIcon />
            </MenuItem> */}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- MenuItem ----------
function MenuItem({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
    >
      <span className="w-5 h-5">{children}</span>
      <span>{label}</span>
    </button>
  );
}

// ---------- Icons ----------
function DollarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1v22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H7" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9h16M4 15h16M10 3v18M14 3v18" />
    </svg>
  );
}

function LimitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M6 8l6-6 6 6" />
      <path d="M6 16l6 6 6-6" />
    </svg>
  );
}
