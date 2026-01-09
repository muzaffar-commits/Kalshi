"use client" 
import React from 'react';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { FaCentSign } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import {
  FaRegCommentAlt,
  FaArrowUp,
  FaRegBookmark,
  FaRegHeart,
  FaRegClock 
} from "react-icons/fa";
import IdeaTabsTwo from "@/components/IdeaTabsTwo/page";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function IdeaTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
          <Box 
  sx={{
    borderBottom: 1,
    borderColor: "var(--border-color)",
  }}
>
              <Tabs
    value={value}
    onChange={handleChange}
    aria-label="time filter tabs"
    sx={{
      "& .MuiTab-root": {
        color: "#6b7280",        
        textTransform: "none",
        fontWeight: 500,
      },
      "& .Mui-selected": {
        color: "#caac75",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "#caac75",
      },
    }}
  >
                  <Tab label="Ideas" {...a11yProps(0)} />
                  <Tab label="Live Trades" {...a11yProps(1)} />
                  <Tab label="Market Builder" {...a11yProps(2)} />
              </Tabs>
          </Box>


  <CustomTabPanel value={value} index={0}>
              <div>
                  <div className="flex items-start gap-4 w-full px-4 mt-4">
                      <Image
                          src="/img/user.png"
                          alt="user"
                          width={60}
                          height={60}
                          className="rounded-full mt-1"
                      />

                      <textarea
                          rows={4}
                          placeholder="What is your prediction?"
                          className="pt-4
      flex-1
      min-h-[80px]
      text-lg
      leading-relaxed
      bg-transparent
      border-0
      resize-none
      outline-none
      focus:outline-none
      focus:ring-0
      dark:text-gray-400
      text-gray-900
      placeholder-gray-400
    "
                      />
                  </div>

                  <div className='flex justify-end gap-4 mr-7'>
                      <button className='py-2 px-4 cursor-pointer dark:text-gray-300 text-gray-800'>GIF</button>
                      <button className='py-2 px-4 cursor-not-allowed bg-gray-700 text-gray-400 rounded-md'>Post</button>
                  </div>
                  <div className='border-t dark:border-gray-700 border-gray-200 mt-3'>
                      <IdeaTabsTwo />
                  </div>
              </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
              <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className='flex justify-between'>
                      <div className='md:flex justify-start gap-4'>
                          <div> <Image
                              src="/img/nick.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          /></div>
                          <div><p className='dark:text-gray-400 text-gray-800 text-sm'>Majchrzak vs Opelka</p>
                              <p className='text-md mt-4'><Link href="/">
                                  <span className="cursor-pointer text-[#c8aa76]">Bought YES: <span className='dark:text-gray-200 text-gray-800'>Reilly Opelka</span> </span>
                              </Link></p>
                              <p className='text-sm dark:text-gray-500 text-gray-600'>100 contracts (28<FaCentSign className='inline-block text-xs' />)</p>
                          </div>
                      </div>
                      <div className='dark:text-gray-500 text-gray-400 text-sm'>Now</div>
                  </div>
              </div>

              <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className='flex justify-between'>
                      <div className='md:flex justify-start gap-4'>
                          <div> <Image
                              src="/img/nick.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          /></div>
                          <div><p className='dark:text-gray-400 text-gray-800 text-sm'>Majchrzak vs Opelka</p>
                              <p className='text-md mt-4'><Link href="/">
                                  <span className="cursor-pointer text-[#c8aa76]">Bought YES: <span className='dark:text-gray-200 text-gray-800'>Reilly Opelka</span> </span>
                              </Link></p>
                              <p className='text-sm dark:text-gray-500 text-gray-600'>100 contracts (28<FaCentSign className='inline-block text-xs' />)</p>
                          </div>
                      </div>
                      <div className='dark:text-gray-500 text-gray-400 text-sm'>2m</div>
                  </div>
              </div>
    
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className='border-b dark:border-gray-700 border-gray-200 pb-3'>
                  <div className="flex items-start gap-4 w-full px-4 mt-4">
                      <Image
                          src="/img/user.png"
                          alt="user"
                          width={60}
                          height={60}
                          className="rounded-full mt-1"
                      />

                      <textarea
                          rows={2}
                          placeholder="Your market title"
                          className="pt-4
      flex-1
      min-h-[80px]
      text-md
      leading-relaxed
      bg-transparent
      border-0
      resize-none
      outline-none
      focus:outline-none
      focus:ring-0
      dark:text-gray-400
      text-gray-900
      dark:placeholder-gray-600
      placeholder-gray-300
    " />
                  </div>

                  <div className='flex justify-end gap-4 mr-7'>
                      <button className='py-2 px-4 cursor-pointer dark:text-gray-300 text-gray-800'>GIF</button>
                      <button className='py-2 px-4 cursor-not-allowed bg-gray-700 text-gray-400 rounded-md'>Next</button>
                  </div>
          </div>
           <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                            <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
                                <div>
                                    <Image
                                        src="/img/nick.jpg"
                                        alt="user"
                                        width={110}
                                        height={110}
                                        className="rounded-md mt-1"
                                    />
                                </div>
                                <div>
                                    <h4><a href='#' className='dark:text-gray-300 hover:underline font-semibold text-gray-700'>riggs916</a> <span className='text-xs dark:text-gray-500 text-gray-500'>17m</span></h4>
                                    <p className='text-md mt-2 dark:text-gray-400 text-gray-800 mb-2'>Who will be a guest on The Joe Rogan Experience?</p>
                                    <p className='dark:text-gray-500 text-gray-500'>I would like to bet on whether or not people like Jeff Bezos, Nick Fuentes, Bryan Cranston, etc. will appear on JRE. This lines up nicely with current events like sports, politics, tech, entertainment, etc.</p>
                                    <div className='border-b border-t py-2 mt-3 dark:border-gray-700 border-gray-200'>
                                        <span className='text-gray-500 text-sm'>Status <span className='dark:text-gray-300 text-gray-800'>Pending review <FaRegClock className='inline-block'/></span></span>
                                    </div>
          
                                    <div className='mt-4'>
                                        <div className='flex justify-between'>
                                            <div className='flex md:gap-3 gap-2 items-center'>
                                                <span className="
            p-2
            rounded
            inline-block
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-400/30
            transition-all
            duration-200
            ease-in-out text-lg cursor-pointer
          ">
                                                    <FaRegCommentAlt />
                                                </span>
                                                <span className='inline-block relative -left-3 font-light text-gray-400'>3</span>
          
                                                <span className="
            p-2
            rounded
            inline-block
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-400/30
            transition-all
            duration-200
            ease-in-out text-xl cursor-pointer
          ">
                                                    <FaRegHeart />
                                                    
                                                </span>
          <span className='inline-block relative -left-3 font-light text-gray-400'>3</span>
                                                <span className="
            p-2
            rounded
            inline-block
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-400/30
            transition-all
            duration-200
            ease-in-out text-lg cursor-pointer
          ">
                                                    <FaRegBookmark />
                                                </span>
                                                <span className='inline-block relative -left-3 font-light text-gray-400'>3</span>
                                                <span className="
            p-2
            rounded
            inline-block
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-400/30
            transition-all
            duration-200
            ease-in-out text-lg cursor-pointer
          ">
                                                    <LuUpload />
                                                </span>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
      </CustomTabPanel>
    </Box>
  );
}
