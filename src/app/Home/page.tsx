"use client"
import React from 'react'
import Image from "next/image";
import { useState } from "react";
import ModalSignup from '@/components/Modal/Signup/page';
import ModalWithTabs from '@/components/Modal/BuySell/page';
import Link from 'next/link';

const Blocks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
       <>
<div className="max-w-[1268px] mx-auto px-4 mt-20 lg:mt-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 lg:pt-0">
        <div className="bg-[#162033] relative min-h-52 rounded-xl p-4 shadow-md border border-[#334661] hover:border-[#232f4c]">
          <div className="flex items-center mb-3">
            <Image src="/img/blockimg1.jpg" width={40} // increased from 10 → better visibility
              height={40}
              alt="trending"
              className="mr-2 rounded" />
            <h2 className="font-semibold text-sm text-white">
            <Link href="./Detail">New York City Mayoral Election</Link>
            </h2>
          </div>
        
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-white">
                <span>Zohran Mamdani</span>
                <div className="flex items-center gap-1">
                  <span>81%</span>
                  <button className="py-1 px-2 bg-green-600/40 text-green-500 rounded-xs text-[10px]">
                    YES
                  </button>
                  <button className="py-1 px-2 bg-red-600/30 text-red-600 rounded-xs text-[10px]">
                    NO
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>Andrew Cuomo</span>
                <div className="flex items-center gap-1">
                  <span>9%</span>
                  <button className="py-1 px-2 bg-green-600/40 text-green-500 rounded-xs text-[10px]">
                    YES
                  </button>
                  <button className="py-1 px-2 bg-red-600/30 text-red-600 rounded-xs text-[10px]">
                    NO
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>Eric Adams</span>
                <div className="flex items-center gap-1">
                  <span>7%</span>
                  <button className="py-1 px-2 bg-green-600/40 text-green-500 rounded-xs text-[10px]">
                  YES
                  </button>
                  <button className="py-1 px-2 bg-red-600/30 text-red-600 rounded-xs text-[10px]">
                  NO
                  </button>
                </div>
              </div>
            </div>

          {/* Footer */}
              <div className="flex absolute bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
              <span>$500k vol.</span>
              <span><a href="#" onClick={() => setIsOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              </a></span>
            </div>
        </div>
         {/* block2 start */}
          <div className="bg-[#162033] min-h-52 relative rounded-xl p-4 shadow-md border border-[#334661] hover:border-[#232f4c]">
            <div className="flex items-center mb-3">
              <Image src="/img/blockimg2.jpg"
                width={40} // increased from 10 → better visibility
                height={40}
                alt="trending"
                className="mr-2 rounded"
              />
              <h2 className="font-semibold text-sm text-white">Can AI generate original artwork?</h2>
            </div>
            <div className="flex items-center mb-1">
            <div className="text-green-400 text-sm font-bold">75% Chance</div>
            </div>
            <div className="flex space-x-2 justify-between">
              <div className='flex flex-col flex-1'>
        <button
        onClick={() => setIsModalOpen(true)}
        className="flex-1 bg-green-600/30 hover:bg-green-700/90 text-green-400 py-1 rounded-md text-md transition-colors duration-150 cursor-pointer"
      >
        Buy Yes ↑
      </button>
      <h5 className='text-gray-400 mt-2 text-sm text-center'>$100 → <span className='text-green-600'>$1,563</span></h5>
      {/* Modal */}
      <ModalWithTabs
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </div>
      
<div className='flex flex-col flex-1'>
              <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-red-600/30 hover:bg-red-700/70 text-red-600 py-1 rounded-md text-md cursor-pointer">Buy No ↓</button>
              <h5 className='mt-2 text-sm text-center text-gray-400'>$100 → <span className='text-green-600'>$105</span></h5>
              </div>
            </div>
            <div className="flex absolute bottom-3 w-[88%] align-baseline justify-between text-xs text-gray-400">
              <span>$500k vol.</span>
              <span><a href="#" onClick={() => setIsOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              </a></span>
            </div>
          </div>
    </div>

   </div>
      <ModalSignup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Create your account</h2>
        <div className='bg-black hover:bg-black/85 w-full p-3 text-center text-white rounded-lg mb-3 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            className="w-5 h-5 inline-block mr-4"
            aria-hidden="true"
          >
            <path fill="#4285F4" d="M533.5 278.4c0-18.6-1.6-36.5-4.7-53.8H272v101.9h146.9c-6.4 34.9-25.6 64.4-54.8 84.2v69.9h88.5c51.8-47.7 80.9-118 80.9-202.2z" />
            <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.4 180.8-66.4l-88.5-69.9c-24.6 16.5-56 26.3-92.3 26.3-70.9 0-131-47.9-152.4-112.3H27.3v70.6C72.1 487.9 165.3 544.3 272 544.3z" />
            <path fill="#FBBC05" d="M119.6 323.9c-5.6-16.5-8.8-34.1-8.8-52s3.2-35.5 8.8-52V149.3H27.3C10 189.1 0 232 0 271.9s10 82.8 27.3 122.6l92.3-70.6z" />
            <path fill="#EA4335" d="M272 107.7c39.9 0 75.7 13.7 103.9 40.7l78-78C404.5 25.2 347 0 272 0 165.3 0 72.1 56.4 27.3 149.3l92.3 70.6C141 155.6 201.1 107.7 272 107.7z" />
          </svg>
          Continue with Google</div>
        <div className='bg-black hover:bg-black/85 w-full p-3 text-center text-white rounded-lg mb-3 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-apple w-5 h-5 inline-block mr-4" viewBox="0 0 16 16">
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
          </svg>
          Continue with Apple</div>
        <div className='border border-gray-600/15 hover:bg-gray-200 w-full p-3 text-center text-gray-800 rounded-lg mb-3 cursor-pointer'><span className="w-5 h-5 fill-current mr-4 inline-block">@</span>Continue with Email</div>
      </ModalSignup>
   </>
  )
}
export default Blocks