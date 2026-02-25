"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Header from "./Layout/Header/page";
import WatchList from "./Layout/WatchList";
import Footer from "./Layout/Footer/page";

export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen ">
      {/* Sidebar logic */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -380 }}
            animate={{ x: 0 }}
            exit={{ x: -380 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-24 left-0 h-[calc(100vh-64px)] w-[380px] border-r border-gray-100 dark:border-gray-800  dark:bg-bgdark z-40"
          >
            <div className="">
              <WatchList />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "pl-[380px]" : "pl-0"
        }`}
      >
        {/* <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white/80 dark:bg-bgdark/80 backdrop-blur-md flex items-center px-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>
        </header> */}
        <Header isPosition={isSidebarOpen} setPosition={setIsSidebarOpen} />

        <main className="pt-16 p-4">{children}</main>
        <Footer isPosition={isSidebarOpen} />
      </div>
    </div>
  );
}
