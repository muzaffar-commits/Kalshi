import React from 'react'
import Image from 'next/image'
import Blockimg2 from '../../../public/img/blockimg2.jpg';
import Andrew from '../../../public/img/andrew.jpg';
import Zohran from '../../../public/img/zohran.png';
const Detail = () => {
  return (
  <>
  <div className="max-w-[1268px] mx-auto px-4 mt-24 lg:mt-40">
    <div className="container mx-auto mt-32 lg:mt-0 p-3 lg:p-6">
          <div className="md:flex lg:items-center mb-6">
            <Image src={Blockimg2} alt="NYC Flag" width={80} height={80} className="mr-4 rounded-lg" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-black/80">New York City Mayoral Election</h1>
              <p className="text-sm text-[#7F90A7]">$5,630,342 Vol. • Nov. 7, 2028 • Earn 4%</p>
              <div className="lg:flex space-x-4 mt-1 text-sm">
                <div className='flex flex-wrap items-center'><span className="bg-red-700 rounded-full inline-block mr-2" style={{ width: '10px', height: '10px' }}></span><span className='text-[#7F90A7] font-semibold'>Zohran Mamdani 80%</span></div>
                <div className='flex items-center'>
                  <span className="bg-blue-500 rounded-full inline-block mr-2" style={{ width: '10px', height: '10px' }}></span><span className='text-[#7F90A7] font-semibold '>Andrew Cuomo 7%</span></div>
                <div className='flex items-center'>
                  <span className="bg-green-500 rounded-full inline-block mr-2" style={{ width: '10px', height: '10px' }}></span><span className='text-[#7F90A7] font-semibold'>Eric Adams 7%</span></div>
                  <div className='flex items-center'>
                  <span className="bg-purple-600 rounded-full inline-block mr-2" style={{ width: '10px', height: '10px' }}></span><span className='text-[#7F90A7] font-semibold'>Rahul 6%</span></div>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-cyan-100/80 rounded-lg h-64 mb-6 flex items-center justify-center">
                <span className="text-gray-500">[Chart Placeholder]</span>
              </div>
              <div className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border rounded-lg border-[#e5e5e5] md:border-0 bg-[#e9f7f9] lg:bg-transparent">
                <div className="flex items-center justify-start mb-3 lg:mb-0">
                  <Image src={Andrew} alt="Andrew Cuomo" width={40} height={40} className="w-12 h-12  rounded-lg bg-white border border-gray-400" />
                  <div className='text-black/70 text-md lg:text-lg font-bold ml-3 text-left'>Andrew Cuomo</div>
                </div>
                <div className="flex space-x-2 justify-between">
                  <button className="bg-[#0099FF]/50 text-white w-50 lg:w-auto px-3 font-bold py-1 rounded">Sell 23¢</button>
                  <button className="bg-cyan-600/30 text-[#0099FF] w-50 lg:w-auto font-semibold px-3 py-1 rounded">Buy 77¢</button>
                </div>
              </div>

              <div className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border rounded-lg border-[#e5e5e5] md:border-0 bg-[#e9f7f9] lg:bg-transparent">
                <div className="flex items-center justify-start mb-3 lg:mb-0">
                  <Image src={Zohran} alt="Zohran Mamdani" width={40} height={40} className="w-12 h-12  rounded-lg bg-white border border-gray-400" />
                  <div className='text-black/70 text-md lg:text-lg font-bold ml-3 text-left'>Zohran Mamdani</div>
                </div>
                <div className="flex space-x-2 justify-between">
                 <button className="bg-[#0099FF]/50 text-white w-50 lg:w-auto px-3 font-bold py-1 rounded">Sell 23¢</button>
                  <button className="bg-cyan-600/30 text-[#0099FF] w-50 lg:w-auto font-semibold px-3 py-1 rounded">Buy 77¢</button>
                </div>
              </div>

              <div className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border rounded-lg border-[#e5e5e5] md:border-0 bg-[#e9f7f9] lg:bg-transparent">
                <div className="flex items-center justify-start mb-3 lg:mb-0">
                  <Image src={Zohran} alt="Andrew Cuomo" width={40} height={40} className="w-12 h-12  rounded-lg bg-white border border-gray-400" />
                  <div className='text-black/80 text-md lg:text-lg font-bold ml-3 text-left'>Zohran Mamdani</div>
                </div>
                <div className="flex space-x-2 justify-between">
                  <button className="bg-[#0099FF]/50 text-white w-50 lg:w-auto px-3 font-bold py-1 rounded">Sell 23¢</button>
                  <button className="bg-cyan-600/30 text-[#0099FF] w-50 lg:w-auto font-semibold px-3 py-1 rounded">Buy 77¢</button>
                </div>
              </div>
            </div>


            <div className="md:col-span-1 border border-[#334661]/50 rounded-lg p-3 lg-p-6">
              <h2 className="text-xl font-bold mb-4 text-black">New York City Election</h2>
              <div className="space-y-3 mb-4">
                <button className="w-full bg-red-700 py-2 px-3 text-left rounded text-white font-semibold">Zohran Mamdani</button>
                <button className="w-full bg-[#0099FF] py-2 px-3 text-left rounded text-white font-semibold">Andrew Cuomo</button>
                <button className="w-full bg-green-600 py-2 px-3 text-left rounded text-white font-semibold">Eric Adams</button>
                <button className="w-full bg-purple-600 py-2 px-3 text-left rounded text-white font-semibold">Rahul</button>
              </div>

              <div className="space-y-3 mb-4">
                <div className='flex justify-between items-center'>
                  <label className="block mb-1 text-[#717E91] font-semibold">Limit Price</label>
                  <input type="number" defaultValue={0} className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] focus:outline-none pl-3" />
                </div>
                <div className='flex justify-between items-center'>
                  <label className="block mb-1 text-[#717E91] font-semibold">Limit Price</label>
                  <span className='w-1/2'>
                    <div className='flex gap-2'>
                      <button type="button" className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] pl-1 text-sm">Min-10</button>
                      <button type="button" className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] pl-1 text-sm">Max-10</button>

                    </div>
                  </span>
                </div>

                <div>
                  <p className='text-white flex justify-between font-bold text-xl'><span>Total:</span> <span>$0.00</span></p>
                </div>
              </div>

              <button className="w-full bg-[#0099FF]/80 hover:bg-[#0099FF] transition py-3 rounded font-bold text-white text-lg">TRADE</button>
              <p className="text-xs text-gray-400 mt-2 text-center">By trading, you agree to the <a href="#" className="underline">Terms of Use</a>.</p>
            </div>
          </div>
  </div>
  </div>
  </>
  )
}

export default Detail