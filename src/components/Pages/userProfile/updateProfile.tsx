import CustomButton from "@/components/common/CustomButton";
import {
  imageUpload,
  postProfileUpdate,
} from "@/components/service/apiService/user";
import {
  UpdateProfilePRops,
  UploadedImage,
  userDetailProps,
} from "@/utils/typesInterface";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useFormik } from "formik";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const userUpdateSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Name is required")
    .min(4, "Must be at least 4 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  image: Yup.string().required("Profile image is required"),
});

export default function UpdateProfile({
  isOpen,
  handleClose,
  userDetails,
  fetchUserDetails,
}: UpdateProfilePRops) {
  const { theme } = useTheme();
  const [isLoader, setIsLoader] = useState(false);
  const [uploadedImage, setUploadedImage] = React.useState<
    UploadedImage[] | null
  >(null);
  const users = userDetails?.user as userDetailProps;

  const chooseImages = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      const response = await imageUpload(formData);
      if (response?.success) {
        setUploadedImage(response?.data);
      } else {
        setUploadedImage(null);
        toast.error(response?.message);
      }
    } catch (error: unknown) {
      setUploadedImage(null);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    chooseImages(file);
  };
  const removeImage = () => {
    setUploadedImage(null);
  };

  const formik = useFormik({
    initialValues: {
      userName: users?.username || "",
      email: users?.email || "",
      image: uploadedImage?.[0]?.url || users?.image_url || "",
    },
    validationSchema: userUpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoader(true);

      try {
        const payload = {
          username: values.userName,
          imageUrl: values.image,
        };
        const response = await postProfileUpdate(payload);
        if (response?.status) {
          toast.success(response.message);
          fetchUserDetails();
          setUploadedImage(null);
          handleClose();
        } else {
          toast.success(response.message);
          setUploadedImage(null);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoader(false);
      }
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };
  const changeUserName = (name: string) => {
    const noSpaceName = name.replace(/\s+/g, "");
    formik.setFieldValue("userName", noSpaceName);
  };

  return (
    <Modal
      open={isOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor:
            theme === "dark"
              ? "rgba(15, 23, 42, 0.7)"
              : "rgba(255,255,255,0.7)",
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
          className=" dark:bg-[#1D293D] w-full max-w-[320px] lg:max-w-[520px] rounded-2xl p-6 lg:p-8 shadow-xl outline-none dark:border-gray-600 border border-gray-300"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold dark:text-white text-center text-gray-900">
              Update Profile
            </h2>
            <button
              onClick={handleCloseModal}
              className="dark:text-gray-300 text-gray-600 text-xl cursor-pointer hover:text-[#c7ac77] dark:hover:text-[#c7ac77]"
            >
              <MdClose size={18} />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            {/* IMAGE PICKER */}
            <div>
              <div className="mt-2">
                <label
                  htmlFor="image"
                  className="
        relative
        flex items-center justify-center
        w-32 h-32
        rounded-full
        border-2 border-dashed
        cursor-pointer
        border-gray-300 dark:border-gray-600
        hover:border-blue-500
        transition
        mx-auto
       
      "
                >
                  {formik.values.image ? (
                    <>
                      {/* IMAGE */}
                      <Image
                        src={formik.values.image}
                        alt="Preview"
                        fill
                        className="object-cover rounded-full"
                      />

                      {/* REMOVE ICON */}
                      <button
                        type="button"
                        onClick={removeImage}
                        className="
              relative -bottom-10 -right-14 z-50
              w-5 h-5
              flex items-center justify-center
              rounded-full
              bg-gray-200 text-red-500
              hover:bg-black cursor-pointer
            "
                      >
                        <MdClose size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <span className="text-2xl">📷</span>
                      <span className="text-sm">Click to upload</span>
                    </div>
                  )}

                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    accept="image/gif,image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.image}
                </p>
              )}
            </div>

            {/* NAME */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 text-gray-800 ">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={(e) => changeUserName(e.target.value)}
                onBlur={formik.handleBlur}
                className="w-full mt-1 px-4 py-3 rounded-xl border 
                border-gray-300 dark:border-gray-600 bg-transparent  text-gray-700
                dark:text-white dark:border-gray-300 border-gray-300 focus:outline-none placeholder:text-gray-400  dark:placeholder:text-gray-200  focus:ring-1"
                placeholder="Enter your name"
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.userName as string}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 text-gray-800">
                Email
              </label>
              <input
                type="email"
                disabled
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="
  w-full mt-1 px-4 py-3 rounded-xl border
  border-gray-300 dark:border-gray-600
  bg-transparent text-gray-700/40 dark:text-white/40

  focus:outline-none
  focus:ring-2 focus:ring-blue-500

  placeholder:text-gray-400
  dark:placeholder:text-gray-600

  placeholder:blur-[1.5px]
  focus:placeholder:blur-0

  transition-all duration-200 
"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email as string}
                </p>
              )}
            </div>

            <CustomButton
              type="submit"
              label="Update Profile"
              loading={isLoader}
            />
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
