import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { LuUpload } from "react-icons/lu";
import {
  FaRegCommentAlt,
  FaArrowUp,
  FaRegBookmark,
  FaRegHeart,
  
} from "react-icons/fa";

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

export default function IdeaTabsTwo() {
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
    <Tab label="Now" {...a11yProps(0)} />
    <Tab label="Today" {...a11yProps(1)} />
    <Tab label="This Week" {...a11yProps(2)} />
    <Tab label="This Month" {...a11yProps(3)} />
  </Tabs>
</Box>
          <CustomTabPanel value={value} index={0}>
            <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
                      <div>
                          <Image
                              src="/img/nick.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <div>
                          <h4><a href='#' className='dark:text-gray-300 hover:underline font-semibold text-gray-700'>riggs916</a> <span className='text-xs dark:text-gray-500 text-gray-500'>17m</span></h4>
                          <p className='text-md mt-2 dark:text-gray-400 text-gray-800'>No I don&apos;t believe a paper thin plot from a low-tier director will go
                              head to head with &apos;Gladiator&apos; (80)</p>
                          <p className='mt-3 cursor-pointer hover:underline text-[#caac75] font-semibold'>Ningbo Rockets vs Beijing Ducks</p>
                          <p className='text-sm text-[#caac75]/80'>Yes . Beijing Ducks . BED at NIN (Jan 6) . 86% chance <FaArrowUp
                              className="
    rotate-45
    text-green-400
    transition-transform
    duration-200
    hover:scale-125 inline-block
  "
                          /> Now 77% chance</p>

                          <div className='mt-4'>
                              <div className='flex justify-between'>
                                  <div className='flex gap-3 items-center'>
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
                                  <div>
                                      <button className='bg-[#caac75] hover:bg-[#caac75]/80 text-white text-sm font-semibold rounded py-2 px-4 cursor-pointer'>Buy</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
             
        </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
                      <div>
                          <Image
                              src="/img/nick.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <div>
                          <h4><a href='#' className='dark:text-gray-300 hover:underline font-semibold text-gray-700'>riggs916</a> <span className='text-xs dark:text-gray-500 text-gray-500'>1h</span></h4>
                          <p className='text-md mt-2 dark:text-gray-400 text-gray-800'>Bang!</p>

       <div className='md:min-w-[330px] w-full bg-green-500/70 p-3 rounded-md min-h-5 md:mt-7 mt-3'>
       <div className='bg-white m-1 rounded-md p-3'>
        <div>
                          <Image
                              src="/img/nick.jpg"
                              alt="user"
                              width={50}
                              height={50}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <p className='dark:text-gray-500 text-gray-950 text-md mt-4'>Dallas at Sacramento</p>
                       <p className='dark:text-gray-500 text-gray-950 text-md mt-4 mb-3'>No. Sacramento</p>

                                  <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Odds</span>
                                          <span className='text-gray-700 font-semibold'>52%</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Cost</span>
                                          <span className='text-gray-700 font-semibold'>$6,669.42</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Current Now</span>
                                          <span className='text-gray-700 font-semibold'>$12,870</span>
                                      </div>
                                  </div>
       </div>
       </div>

                          <div className='mt-4'>
                              <div className='flex justify-between'>
                                  <div className='flex gap-3 items-center'>
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
      <CustomTabPanel value={value} index={2}>
         <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
                      <div>
                          <Image
                              src="/img/blockimg2.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <div>
                          <h4><a href='#' className='dark:text-gray-300 hover:underline font-semibold text-gray-700'>riggs916</a> <span className='text-xs dark:text-gray-500 text-gray-500'>Jan 6</span></h4>
                          <p className='text-md mt-2 dark:text-gray-400 text-gray-800'>Bang!</p>

       <div className='md:min-w-[330px] w-full bg-green-500/70 p-3 rounded-md min-h-5 md:mt-7 mt-3'>
       <div className='bg-white m-1 rounded-md p-3'>
        <div>
                          <Image
                              src="/img/blockimg2.jpg"
                              alt="user"
                              width={50}
                              height={50}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <p className='dark:text-gray-500 text-gray-950 text-md mt-4'>Dallas at Sacramento</p>
                       <p className='dark:text-gray-500 text-gray-950 text-md mt-4 mb-3'>No. Sacramento</p>

                                  <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Odds</span>
                                          <span className='text-gray-700 font-semibold'>52%</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Cost</span>
                                          <span className='text-gray-700 font-semibold'>$6,669.42</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Current Now</span>
                                          <span className='text-gray-700 font-semibold'>$12,870</span>
                                      </div>
                                  </div>
       </div>
       </div>

                          <div className='mt-4'>
                              <div className='flex justify-between'>
                                  <div className='flex gap-3 items-center'>
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
       <CustomTabPanel value={value} index={3}>
        <div className='p-3 border-b dark:border-gray-700 border-gray-200'>
                  <div className="md:flex items-start gap-4 w-full md:px-4 px-0">
                      <div>
                          <Image
                              src="/img/andrew.jpg"
                              alt="user"
                              width={70}
                              height={70}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <div>
                          <h4><a href='#' className='dark:text-gray-300 hover:underline font-semibold text-gray-700'>riggs916</a> <span className='text-xs dark:text-gray-500 text-gray-500'>Dec 23 2025</span></h4>
                          <p className='text-md mt-2 dark:text-gray-400 text-gray-800'>Bang!</p>

       <div className='md:min-w-[330px] w-full bg-green-500/70 p-3 rounded-md min-h-5 md:mt-7 mt-3'>
       <div className='bg-white m-1 rounded-md p-3'>
        <div>
                          <Image
                              src="/img/andrew.jpg"
                              alt="user"
                              width={50}
                              height={50}
                              className="rounded-md mt-1"
                          />
                      </div>
                      <p className='dark:text-gray-500 text-gray-950 text-md mt-4'>Dallas at Sacramento</p>
                       <p className='dark:text-gray-500 text-gray-950 text-md mt-4 mb-3'>No. Sacramento</p>

                                  <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Odds</span>
                                          <span className='text-gray-700 font-semibold'>52%</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Cost</span>
                                          <span className='text-gray-700 font-semibold'>$6,669.42</span>
                                      </div>
                                  </div>
                                   <div className='mb-1 bg-gray-200/60 px-4 py-2 rounded-md'>
                                      <div className='flex justify-between'>
                                          <span className='text-gray-500'>Current Now</span>
                                          <span className='text-gray-700 font-semibold'>$12,870</span>
                                      </div>
                                  </div>
       </div>
       </div>

                          <div className='mt-4'>
                              <div className='flex justify-between'>
                                  <div className='flex gap-3 items-center'>
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
