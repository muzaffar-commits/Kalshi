import React from "react";
import Blocks from "./Home/page";
import { Toaster } from "react-hot-toast";
const Home = () => {
  return (
    <div className="bg-white dark:bg-[#0f172a]">
      <Toaster />
      <Blocks />
    </div>
  );
};
export default Home;
