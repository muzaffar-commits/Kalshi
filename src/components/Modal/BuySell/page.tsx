"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Dropdown from "@/components/popupDropdown/page";
import Blockimg1 from "../../../../public/img/blockimg1.jpg";
import {
  getCommonQuoteSell,
  getOrdersQuoteDetails,
  getQuoteByBudget,
  submitOrder,
} from "@/components/service/apiService/buySell";
import { TfiExchangeVertical } from "react-icons/tfi";
import toast from "react-hot-toast";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowDetails: any;
  orderType: string;
  option: any;
  fetchDetail: any;
  handleChangeOrderType: (type: "buy" | "sell") => void;
}

export default function BuySell({
  isOpen,
  onClose,
  rowDetails,
  orderType,
  option,
  fetchDetail,
  handleChangeOrderType,
}: ModalProps) {
  const [share, setShare] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [types, setTypes] = useState<any | "">("market");
  const balance = localStorage.getItem("balance");
  const token = localStorage.getItem("token");

  const [activeField, setActiveField] = useState<"shares" | "amount" | null>(
    null
  );
  const [shareDetailAmount, setShareDetailAmount] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState(0);

  const checkMarketISOpen = rowDetails?.question?.status === "OPEN";
  console.log(checkMarketISOpen, "checkMarketISOpen");

  useEffect(() => {
    if (activeField == "shares") {
      setAmount("");
    }
    if (activeField == "amount") {
      setShare("");
    }
  }, [activeField]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (activeField === "shares" && share !== "") {
        setDebouncedValue(Number(share));
      }
      if (activeField === "amount" && amount !== "") {
        setDebouncedValue(Number(amount));
      }
    }, 300);

    return () => clearTimeout(t);
  }, [share, amount, activeField]);
  const orderDetailsGet = async () => {
    if (activeField == "shares") {
      try {
        const response = await getOrdersQuoteDetails(
          rowDetails.question.id,
          option.index,
          debouncedValue
        );
        if (response?.success) {
          setAmount(response?.data?.fee?.toFixed(2) || "");
          setShareDetailAmount(response?.data || {});
        } else {
          setAmount("");
          setShareDetailAmount({});
        }
      } catch (error) {
        setAmount("");
        setShareDetailAmount({});
      }
    }
    if (activeField == "amount") {
      try {
        const response: any = await getQuoteByBudget(
          rowDetails.question.id,
          option.index,
          debouncedValue
        );
        if (response?.success) {
          setShare(response?.data?.fee?.toFixed(2) || "");
          setShareDetailAmount(response?.data || {});
        } else {
          setShare("");
          setShareDetailAmount({});
        }
      } catch (error) {
        setShare("");
        setShareDetailAmount({});
      }
    }

    if (orderType == "sell") {
      try {
        const response = await getCommonQuoteSell(
          rowDetails.question.id,
          option.index,
          debouncedValue
        );
        // console.log(response, "getCommonQuoteSell");
        if (response?.success) {
          setAmount(response?.data?.fee?.toFixed(2) || "");
          setShareDetailAmount(response?.data || {});
        } else {
          setAmount("");
          setShareDetailAmount({});
        }
      } catch (error) {
        setAmount("");
        setShareDetailAmount({});
      }
    }
  };

  useEffect(() => {
    if (!rowDetails?.question?.id) return;
    if (orderType) {
      orderDetailsGet();
    }
  }, [debouncedValue, rowDetails?.question?.id, option?.index]);

  const handleClose = () => {
    setAmount("");
    setShare("");
    onClose();
  };

  const handleSubmit = async () => {
    const reqBody = {
      questionId: rowDetails.question.id,
      outcomeIndex: option.index,
      side: orderType,
      type: types,
      shares: shareDetailAmount?.shares || "",
      // "maxCost" : "9.1",
      timeInForce: "IOC",
    };
    try {
      const response = await submitOrder(reqBody);
      if (response?.success) {
        toast.success(response.message);
        // fetchDetail();
        handleClose();
      } else {
      }
    } catch (error: any) {
      toast.error("internal server error");
    }
  };

  console.log(debouncedValue, "debouncedValue======");

  return (
    <Modal
      open={isOpen}
      // onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="bg-white p-6 lg:p-10 rounded-xl overflow-hidden shadow-lg w-full max-w-[320px] lg:max-w-[430px] outline-none"
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-900 hover:text-gray-500"
          >
            ✕
          </button>

          <div
            className={`absolute ${
              checkMarketISOpen ? "bg-green-500" : "bg-red-500"
            }  text-white text-center w-28 top-4 -left-7   -rotate-45 `}
          >
            {checkMarketISOpen ? "Open" : "Not Open"}
          </div>
          {/* Header */}
          <div className="flex flex-row gap-2 justify-between mb-0">
            <Image
              src={Blockimg1}
              alt="Block"
              width={60}
              height={60}
              className="rounded-lg max-h-[45px]"
            />
            <h6 className="text-sm text-black">
              {rowDetails?.question?.question || "--"}
            </h6>
          </div>

          <div className="flex items-center ml-14 mb-3  gap-3">
            <h2 className="text-[#0099FF] font-semibold">
              {orderType === "buy" ? "Buy" : "Sell"} Now
            </h2>
            <span className="text-gray-500">- {option?.name || "--"}</span>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-300 mb-4 relative">
            <div className="absolute right-0 top-0">
              <Dropdown
                onSelect={(v) => {
                  setTypes(v);
                }}
              />
            </div>

            <button
              onClick={() => {
                handleChangeOrderType("buy");
                setShareDetailAmount({});
                setDebouncedValue(0);
                setAmount("");
                setShare("");
              }}
              className={`py-2 mr-6 font-medium ${
                orderType === "buy"
                  ? "border-b-2 border-[#0099FF] text-[#0099FF]"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Buy
            </button>

            <button
              onClick={() => {
                handleChangeOrderType("sell");

                setShareDetailAmount({});
                setDebouncedValue(0);
                setAmount("");
                setShare("");
              }}
              className={`py-2 font-medium ${
                orderType === "sell"
                  ? "border-b-2 border-[#0099FF] text-[#0099FF]"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              Sell
            </button>
          </div>

          <>
            <div className="flex flex-col gap-3">
              {orderType === "buy" ? (
                <>
                  <label className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                    <span>
                      <span className="block text-sm text-gray-400">
                        Shares
                      </span>
                      <span className="block text-sm text-[#0099FF]">
                        No Interest
                      </span>
                    </span>

                    <input
                      type="number"
                      placeholder="0"
                      value={share}
                      onFocus={() => setActiveField("shares")}
                      onChange={(e) =>
                        setShare(
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      onWheel={(e) => e.currentTarget.blur()}
                      className="border-none outline-none text-gray-800 text-3xl text-right w-32 bg-transparent"
                    />
                  </label>
                  <div className="flex items-center justify-center text-gray-400">
                    <TfiExchangeVertical size={25} />
                  </div>
                  <label className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                    <span>
                      <span className="block text-sm text-gray-400">
                        Amount
                      </span>
                      <span className="block text-sm text-[#0099FF]">
                        No Interest
                      </span>
                    </span>

                    <input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onFocus={() => setActiveField("amount")}
                      onChange={(e) =>
                        setAmount(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      onWheel={(e) => e.currentTarget.blur()}
                      className="border-none outline-none text-gray-800 text-3xl text-right w-32 bg-transparent"
                    />
                  </label>
                </>
              ) : (
                <>
                  {" "}
                  <label className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center">
                    <span>
                      <span className="block text-sm text-gray-400">
                        Shares
                      </span>
                      <span className="block text-sm text-[#0099FF]">
                        No Interest
                      </span>
                    </span>

                    <input
                      type="number"
                      placeholder="0"
                      min={0}
                      max={option?.userPosition?.shares ?? 0}
                      value={share}
                      onFocus={() => setActiveField("shares")}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const maxShares = option?.userPosition?.shares ?? 0;

                        if (value <= maxShares) {
                          setShare(value);
                        }
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className="border-none outline-none text-gray-800 text-3xl text-right w-56 bg-transparent"
                    />
                  </label>
                </>
              )}
            </div>

            <div className="flex flex-row mt-2">
              {" "}
              <div className="bg-[#0099FF] font-semibold text-white px-2 py-1 rounded">
                {" "}
                LOC{" "}
              </div>{" "}
            </div>

            <div className="flex text-black py-3 text-sm flex-col gap-2">
              <div className="text-[#0099FF] font-semibold text-lg">
                Share Details :
              </div>
              {orderType === "buy" ? (
                <>
                  {token && (
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">
                        Available Balance
                      </span>
                      <span className="text-gray-600 text-sm font-medium">
                        ₹ {Number(balance || 0).toFixed(2) || 0}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Fee</span>
                    <span>
                      ₹ {Number(shareDetailAmount?.fee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Net Cost</span>
                    <span>
                      ₹ {Number(shareDetailAmount?.netCost || 0).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2  bg-white py-2 ">
                    {/* Total Buy Share */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        Total Buy Share
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {(option?.userPosition?.shares || 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Fee</span>
                      <span>
                        ₹ {Number(shareDetailAmount?.fee || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Receive</span>
                      <span>
                        ₹{" "}
                        {Number(shareDetailAmount?.netProceeds || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              disabled={debouncedValue == 0 || !checkMarketISOpen}
              onClick={handleSubmit}
              className={`mt-4 py-3 text-lg text-white font-bold ${
                debouncedValue == 0 || !checkMarketISOpen
                  ? "bg-[#62bdfa]"
                  : "bg-[#0099FF] hover:bg-[#0099FF]/90"
              }  rounded-xl w-full`}
            >
              <span className="capitalize">{orderType || "--"}</span>{" "}
              <span className="text-gray-200">₹</span>{" "}
              <span className="text-gray-200">
                {orderType == "buy"
                  ? Number(shareDetailAmount?.grossCost || 0).toFixed(2)
                  : Number(shareDetailAmount?.grossProceeds || 0).toFixed(2)}
              </span>
            </button>
          </>
        </Box>
      </Fade>
    </Modal>
  );
}
