import React from "react";
import Blocks from "./Home/page";
import { Toaster } from "react-hot-toast";
const Home = () => {
  return (
    <>
      <Toaster />
      <Blocks />
    </>
  );
};
export default Home;
