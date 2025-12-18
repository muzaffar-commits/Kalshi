"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { questionDetails } from "@/components/service/apiService/category";
import { useParams } from "next/navigation";
import ChartRealtime from "./realTimeChart";

// export async function generateStaticParams() {
//   return [{ slug: "btc" }, { slug: "eth" }, { slug: "bnb" }];
// }

const Page = () => {
  const [data, setData] = useState<any>({});
  const { slug } = useParams();

  console.log(slug, "params");

  const questionDetailsList = async () => {
    try {
      const response: any = await questionDetails(slug);

      console.log(response, "response");

      if (response?.success) {
        setData(response?.data || {});
      } else {
        setData({});
      }
    } catch (error: any) {
      console.log(error, "error");

      setData({});
    }
  };

  useEffect(() => {
    questionDetailsList();
  }, [slug]);

  console.log(data, "========");

  return (
    <>
      <div className="max-w-[1268px] mx-auto px-4 mt-24 lg:mt-28">
        <div className="container mx-auto p-3 lg:p-6">
          <div className="md:flex lg:items-center mb-6">
            <Image
              src="/img/blockimg1.jpg"
              alt="NYC Flag"
              width={80}
              height={80}
              className="mr-4 rounded-lg"
            />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-black">
                {data?.question?.question}
              </h1>
              <p className="text-sm text-[#7F90A7]">
                ${data?.market?.totalMarketVolume || 0} Vol.
              </p>
              <div className="lg:flex space-x-4 mt-1 text-sm">
                {data?.options?.map((item: any, index: any) => (
                  <div className=" text-wrap items-center">
                    <span
                      className={`rounded-full ${
                        index === 0
                          ? "bg-red-700 "
                          : index === 1
                          ? "bg-blue-500 "
                          : index === 2
                          ? "bg-green-500 "
                          : index === 3
                          ? "bg-purple-600 "
                          : index === 4
                          ? "bg-yellow-700 "
                          : "bg-pink-500"
                      } inline-block mr-2`}
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                    <span className="text-[#7F90A7] font-semibold">
                      {item?.name || "--"}, {(item?.price * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {data?.graphData?.length > 0 ? (
                <div className="bg-gray-800 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <span className="text-gray-500">
                    <ChartRealtime />
                  </span>
                </div>
              ) : (
                <div className="bg-cyan-100/80 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <span className="text-gray-500">[Chart Placeholder]</span>
                </div>
              )}

              {data?.options?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border !text-[#162033] rounded-lg border-[#334661] md:border-0 bg-[#162033] lg:bg-transparent"
                >
                  <div className="flex items-center justify-start mb-3 lg:mb-0">
                    <Image
                      src="https://cdn.pixabay.com/photo/2016/11/01/18/45/silhouette-1789199_1280.png"
                      alt="Andrew Cuomo"
                      width={40}
                      height={40}
                      className="w-12 h-12 bg-cover  rounded-lg bg-white border border-gray-400"
                    />
                    <div className=" text-md lg:text-lg font-bold ml-3 text-left">
                      {item?.name || "--"}
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-between">
                    <div className="pr-3">
                      {(item?.price * 100).toFixed(1)}%
                    </div>
                    <button className="bg-red-700/40 text-red-600 w-50 lg:w-auto px-3 font-bold py-1 rounded">
                      Sell
                    </button>
                    <button className="bg-green-600/40 text-green-500 w-50 lg:w-auto font-semibold px-3 py-1 rounded">
                      Buy
                    </button>
                  </div>
                </div>
              ))}

              {/* <div className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border rounded-lg border-[#334661] md:border-0 bg-[#162033] lg:bg-transparent">
                <div className="flex items-center justify-start mb-3 lg:mb-0">
                  <Image
                    src="/img/zohran.png"
                    alt="Zohran Mamdani"
                    width={40}
                    height={40}
                    className="w-12 h-12  rounded-lg bg-white border border-gray-400"
                  />
                  <div className="text-white text-md lg:text-lg font-bold ml-3 text-left">
                    Zohran Mamdani
                  </div>
                </div>
                <div className="flex space-x-2 justify-between">
                  <button className="bg-red-700/40 text-red-600 w-50 lg:w-auto px-3 font-bold py-1 rounded">
                    Sell 23¢
                  </button>
                  <button className="bg-green-600/40 text-green-500 w-50 lg:w-auto font-semibold px-3 py-1 rounded">
                    Buy 77¢
                  </button>
                </div>
              </div>

              <div className="md:flex items-center justify-between text-center px-2 md:px-0 py-3 md:py-0 border rounded-lg border-[#334661] md:border-0 bg-[#162033] lg:bg-transparent">
                <div className="flex items-center justify-start mb-3 lg:mb-0">
                  <Image
                    src="/img/zohran.png"
                    alt="Andrew Cuomo"
                    width={40}
                    height={40}
                    className="w-12 h-12  rounded-lg bg-white border border-gray-400"
                  />
                  <div className="text-white text-md lg:text-lg font-bold ml-3 text-left">
                    Zohran Mamdani
                  </div>
                </div>
                <div className="flex space-x-2 justify-between">
                  <button className="bg-red-700/40 text-red-600 w-50 lg:w-auto px-3 font-bold py-1 rounded cursor-pointer">
                    Sell 23¢
                  </button>
                  <button className="bg-green-600/40 text-green-500 lg:w-auto w-50 font-semibold px-3 py-1 rounded cursor-pointer">
                    Buy 77¢
                  </button>
                </div>
              </div> */}
            </div>

            <div className="md:col-span-1 border border-[#334661] rounded-lg p-3 lg-p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                New York City Election
              </h2>
              <div className="space-y-3 mb-4">
                <button className="w-full bg-red-700 py-2 px-3 text-left rounded text-white font-semibold">
                  Zohran Mamdani
                </button>
                <button className="w-full bg-blue-600 py-2 px-3 text-left rounded text-white font-semibold">
                  Andrew Cuomo
                </button>
                <button className="w-full bg-green-600 py-2 px-3 text-left rounded text-white font-semibold">
                  Eric Adams
                </button>
                <button className="w-full bg-purple-600 py-2 px-3 text-left rounded text-white font-semibold">
                  Rahul
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <label className="block mb-1 text-[#717E91] font-semibold">
                    Limit Price
                  </label>
                  <input
                    type="number"
                    defaultValue={0}
                    className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] focus:outline-none pl-3"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="block mb-1 text-[#717E91] font-semibold">
                    Limit Price
                  </label>
                  <span className="w-1/2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] pl-1 text-sm"
                      >
                        Min-10
                      </button>
                      <button
                        type="button"
                        className="w-1/2 py-1 rounded border border-[#717E91] text-[#717E91] hover:border-[#406db1] focus:border-[#406db1] pl-1 text-sm"
                      >
                        Max-10
                      </button>
                    </div>
                  </span>
                </div>

                <div>
                  <p className="text-white flex justify-between font-bold text-xl">
                    <span>Total:</span> <span>$0.00</span>
                  </p>
                </div>
              </div>

              <button className="w-full bg-purple-700 py-3 rounded font-bold text-white text-lg">
                TRADE
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                By trading, you agree to the{" "}
                <a href="#" className="underline">
                  Terms of Use
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
