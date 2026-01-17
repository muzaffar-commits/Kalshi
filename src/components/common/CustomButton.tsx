import { CircularProgress } from "@mui/material";
import clsx from "clsx";

interface PrimaryButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({
  label,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        `
        w-full py-3 rounded-xl text-lg font-semibold
        text-white

        bg-gradient-to-r
        from-[#c7ac77] to-[#b89b63]

        hover:from-[#d6bc87] hover:to-[#c0a46f]

        transition-all duration-200
        flex items-center justify-center gap-2

        disabled:opacity-60 disabled:cursor-not-allowed
        `,
        className
      )}
    >
      {loading ? <CircularProgress size={26} sx={{ color: "#fff" }} /> : label}
    </button>
  );
}
