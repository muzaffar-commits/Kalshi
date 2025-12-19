import { useState } from "react";

export default function ExpirationDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Immediate-Or-Cancel");

  const options = ["Good 'til canceled", "12AM EDT", "Immediate-Or-Cancel"];

  return (
    <div className="mt-3 relative w-full max-w-sm">
      {/* Trigger Block */}
      <div
        className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Left Label */}
        <span className="text-sm text-gray-400">Expiration</span>

        {/* Right Selected Value */}
        <span className="text-xs text-gray-900 font-semibold flex items-center">
          {selected}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`ml-2 transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-1 w-full border border-gray-200 rounded-md shadow-md bg-white z-10">
          {options.map((option, idx) => (
            <button
              key={idx}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                selected === option ? "bg-gray-50 font-semibold" : ""
              }`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
