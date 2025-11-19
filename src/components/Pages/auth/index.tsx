import ModalSignup from "@/components/Modal/Signup/page";
import React, { useState } from "react";
import Register from "./register";
import { googleLoginAPI } from "@/components/service/auth";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GOOGLE_CLIENT_ID } from "@/components/content";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/components/store/slice/auth";

export default function Authentication({
  isOpen = false,
  isLogin = false,
  handleClose,
}: {
  isOpen: boolean;
  isLogin: boolean;
  handleClose: () => void;
}) {
  const [registerOpen, setRegisterOpen] = useState(false);
  const user = useSelector((state: any) => state);
  const dispatch = useDispatch();
  console.log(user, "rpx==================");
  const handleRegister = () => {
    handleClose();
    setRegisterOpen(true);
  };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };
  const loginWithGoogle = async (token: any) => {
    try {
      const reqBody = {
        idToken: token,
      };
      const response = await googleLoginAPI(reqBody);
      console.log(response, "response");

      if (response?.success) {
        dispatch(
          login({ user: response?.data?.user, token: response?.data?.token })
        );
        toast.success(response?.message);
        handleClose();
      } else {
        toast.error(response?.message || "Something went wrong?");
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal server error!");
    }
  };
  return (
    <>
      <ModalSignup isOpen={isOpen} onClose={handleClose}>
        <h2 className="text-xl text-black font-bold mb-4">
          {isLogin ? " Login your account" : " Create your account"}
        </h2>
        {/* <div
          onClick={loginWithGoogle}
          className="bg-black hover:bg-black/85 w-full p-3 text-center text-white rounded-lg mb-3 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            className="w-5 h-5 inline-block mr-4"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-18.6-1.6-36.5-4.7-53.8H272v101.9h146.9c-6.4 34.9-25.6 64.4-54.8 84.2v69.9h88.5c51.8-47.7 80.9-118 80.9-202.2z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c73.7 0 135.6-24.4 180.8-66.4l-88.5-69.9c-24.6 16.5-56 26.3-92.3 26.3-70.9 0-131-47.9-152.4-112.3H27.3v70.6C72.1 487.9 165.3 544.3 272 544.3z"
            />
            <path
              fill="#FBBC05"
              d="M119.6 323.9c-5.6-16.5-8.8-34.1-8.8-52s3.2-35.5 8.8-52V149.3H27.3C10 189.1 0 232 0 271.9s10 82.8 27.3 122.6l92.3-70.6z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c39.9 0 75.7 13.7 103.9 40.7l78-78C404.5 25.2 347 0 272 0 165.3 0 72.1 56.4 27.3 149.3l92.3 70.6C141 155.6 201.1 107.7 272 107.7z"
            />
          </svg>
          Continue with Google
        </div> */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <div className="w-full flex justify-center mt-10">
            <div className="w-full max-w-md">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const token: any = credentialResponse.credential;
                  const userInfo = jwtDecode(token);
                  console.log("User Info:", userInfo);
                  await loginWithGoogle(token);
                }}
                onError={() => toast.error("Login Failed")}
                width="100%"
                theme="filled_blue"
                shape="square"
                size="large"
                containerProps={{
                  style: {
                    width: "100%",
                    borderRadius: "0px",
                    overflow: "hidden",
                  },
                }}
              />
            </div>
          </div>
        </GoogleOAuthProvider>

        <div className="bg-black hover:bg-black/85 w-full p-3 text-center text-white rounded-lg mt-3 mb-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-apple w-5 h-5 inline-block mr-4"
            viewBox="0 0 16 16"
          >
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
          </svg>
          Continue with Apple
        </div>
        <div
          onClick={handleRegister}
          className="border border-gray-600/15 hover:bg-gray-200 w-full p-3 text-center text-gray-800 rounded-lg mb-3 cursor-pointer"
        >
          <span className="w-5 h-5 fill-current mr-4 inline-block">@</span>
          Continue with Email
        </div>
      </ModalSignup>
      <Register
        isLogin={isLogin}
        handleClose={handleRegisterClose}
        isOpen={registerOpen}
      />
    </>
  );
}
