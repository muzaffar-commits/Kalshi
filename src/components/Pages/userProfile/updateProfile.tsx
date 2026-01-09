import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
export default function UpdateProfile({ isOpen, handleClose }: ModalProps) {
  const { theme } = useTheme();
  return (
    <Modal
      open={isOpen}
      //   onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor:
            theme == "dark"
              ? "rgba(15, 23, 42, 0.7)"
              : "rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="bg-white dark:bg-[#0f172a] p-6 lg:p-10 rounded-xl overflow-hidden shadow-lg w-full max-w-[320px] lg:max-w-[530px] outline-none"
        >
          <div className="absolute left-0  top-5 w-full">
            <div className=" px-3 w-full flex items-center justify-between">
              <div className="dark:text-white font-serif text-gray-900">
                Update Profile
              </div>
              <button
                onClick={handleClose}
                className="  cursor-pointer text-gray-900 dark:text-gray-200 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
