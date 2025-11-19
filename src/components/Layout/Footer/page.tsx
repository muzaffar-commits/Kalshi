import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="pt-16 lg:pt-30 pb-10">
   <div className="max-w-[1268px] mx-auto px-4 mt-4">
  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3">
  <div>
    <a href="#"><div className="flex items-center space-x-2 mb-1">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">X</span>
          </div>
          <h1 className="block text-xl font-bold">
          <span className="text-purple-400">DEMO</span> <span className="text-white">MARKET</span>
          </h1>
        </div></a>
    <hr className="my-5 border border-gray-700"/>
        <div className="text-end flex mt-4 mr-12">
        <a href="#" className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" className="w-6 h-6 fill-white hover:fill-purple-500 transition-colors duration-300">
  <path d="M714.163 519.284L1160.89 0H1051.61L670.79 442.357 368.573 0H0L468.769 681.821 0 1226.37h109.285l403.16-471.205 317.712 471.205H1200L714.163 519.284ZM568.89 691.351l-46.55-67.251L148.727 
           79.694h159.241l298.857 431.865 46.55 67.251 395.775 571.755H889.909L568.89 691.351Z"/>
</svg>
</a>

<a href="#" className="inline-block mr-2">
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 320 512" 
       className="w-6 h-6 fill-white hover:fill-purple-500 transition-colors duration-300">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35
             12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 268.1
             0c-73.29 0-121.1 44.38-121.1 124.72v70.62H86.41V288h60.59v224h92.66V288z"/>
  </svg>
</a>

<a href="#" className="mr-2 inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-white hover:fill-purple-500 transition-colors duration-300">
  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9
           114.9s51.3 114.9 114.9 114.9 114.9-51.3
           114.9-114.9S287.7 141 224.1 141zm0
           190.5c-41.8 0-75.6-33.8-75.6-75.6s33.8-75.6
           75.6-75.6 75.6 33.8 75.6 75.6-33.8 75.6-75.6
           75.6zm146.4-194.3c0 14.9-12 26.9-26.9
           26.9s-26.9-12-26.9-26.9 12-26.9
           26.9-26.9 26.9 12 26.9 26.9zm76.1
           27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9
           0-35.9 1.7-67.7 9.9-93.9 36.2-26.2
           26.2-34.4 58-36.2 93.9-2.1 37-2.1
           147.9 0 184.9 1.7 35.9 9.9 67.7
           36.2 93.9 26.2 26.2 58 34.4 93.9
           36.2 37 2.1 147.9 2.1 184.9 0
           35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2
           34.4-58 36.2-93.9 2.1-37 2.1-147.9
           0-184.9zM398.8 388c-7.8 19.6-22.9
           34.7-42.6 42.6-29.5 11.7-99.5
           9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7
           9-132.1c7.8-19.6 22.9-34.7
           42.6-42.6 29.5-11.7 99.5-9
           132.1-9s102.7-2.6 132.1 9c19.6
           7.8 34.7 22.9 42.6 42.6 11.7
           29.5 9 99.5 9 132.1s2.6 102.7-9
           132.1z"/>
</svg>
</a>
        </div>
        <div className="text-end">
        </div>
  </div>
  <div className="inline-block mr-0 md:ml-10">
    <h4 className="font-bold mb-3 text-white">Links</h4>
    <ul className="text-sm leading-7 text-[#8D9CB1]">
      <li><a href="#" className="hover:text-purple-400">Market Data</a></li>
      <li><a href="#" className="hover:text-purple-400">Opinion</a></li>
      <li><a href="#" className="hover:text-purple-400">Audio</a></li>
      <li><a href="#" className="hover:text-purple-400">Magazines</a></li>
      <li><a href="#" className="hover:text-purple-400">Events</a></li>
    </ul>
  </div>
  <div className="mr-0 md:ml-10"><h4 className="font-bold mb-3 text-white">News</h4>
    <ul className="text-sm leading-7 text-[#8D9CB1]">
      <li><a href="#" className="hover:text-purple-400">Market</a></li>
      <li><a href="#" className="hover:text-purple-400">Economics</a></li>
      <li><a href="#" className="hover:text-purple-400">Technology</a></li>
      <li><a href="#" className="hover:text-purple-400">Politics</a></li>
      <li><a href="#" className="hover:text-purple-400">Crypto</a></li>
      <li><a href="#" className="hover:text-purple-400">AI</a></li>
    </ul></div>
  <div className="mr-0 md:ml-10"><h4 className="font-bold mb-3 text-white">Sports</h4>
    <ul className="text-sm leading-7 text-[#8D9CB1]">
      <li><a href="#" className="hover:text-purple-400">Cricket</a></li>
      <li><a href="#" className="hover:text-purple-400">Football</a></li>
      <li><a href="#" className="hover:text-purple-400">Tennis</a></li>
      <li><a href="#" className="hover:text-purple-400">Badminton</a></li>
      <li><a href="#" className="hover:text-purple-400">Swimming</a></li>
      <li><a href="#" className="hover:text-purple-400">Golf</a></li>
      <li><a href="#" className="hover:text-purple-400">Skydiving</a></li>
    </ul></div>
    <div className="mr-0 md:ml-10"><h4 className="font-bold mb-3 text-white">Crypto</h4>
    <ul className="text-sm leading-7 text-[#8D9CB1]">
      <li><a href="#" className="hover:text-purple-400">Bitcoin</a></li>
      <li><a href="#" className="hover:text-purple-400">Ethereum</a></li>
      <li><a href="#" className="hover:text-purple-400">Binance</a></li>
      <li><a href="#" className="hover:text-purple-400">Tether</a></li>
      <li><a href="#" className="hover:text-purple-400">Solana</a></li>
      <li><a href="#" className="hover:text-purple-400">TRX</a></li>
    </ul></div>
    <div className="mr-0 md:ml-10"><h4 className="font-bold mb-3 text-white">Trending</h4>
    <ul className="text-sm leading-7 text-[#8D9CB1]">
      <li><a href="#" className="hover:text-purple-400">Trump</a></li>
      <li><a href="#" className="hover:text-purple-400">Middle East</a></li>
      <li><a href="#" className="hover:text-purple-400">Politics</a></li>
      <li><a href="#" className="hover:text-purple-400">Culture</a></li>
      <li><a href="#" className="hover:text-purple-400">World</a></li>
      <li><a href="#" className="hover:text-purple-400">Election</a></li>
    </ul></div>
 </div>
 <hr className="my-5 border border-gray-700"/>
 <p className="text-center text-md text-[#334661]">&copy;2025 Demosite. All rights reserved.</p>
 </div>
</div>
    </>
  )
}

export default Footer