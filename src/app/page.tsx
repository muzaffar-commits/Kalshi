import React from "react";
import Blocks from "./Home/page";
import { Toaster } from "react-hot-toast";
const Home = () => {
  return (
    <div className="!bg-white">
      <Toaster />
      <Blocks />
    </div>
  );
};
export default Home;
