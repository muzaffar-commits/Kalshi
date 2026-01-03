"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Dropdown from "@/components/popupDropdown/page";
import BlockImg from "../../../../public/img/blockimg1.jpg";
import {
  getCommonQuoteSell,
  getOrdersQuoteDetails,
  getQuoteByBudget,
  submitOrder,
} from "@/components/service/apiService/buySell";
import { TfiExchangeVertical } from "react-icons/tfi";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { userBalance } from "@/components/service/apiService/user";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowDetails: any;
  orderType: string;
  option: any;
  optionIndex: any;
  handleChangeOrderType: (type: "buy" | "sell") => void;
}

export default function BuySell({
  isOpen,
  onClose,
  rowDetails,
  orderType,
  option,
  optionIndex,
  handleChangeOrderType,
}: ModalProps) {
  const [share, setShare] = useState<number | "">("");
  const [limitShare, setLimitShare] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [types, setTypes] = useState<any | "">("market");
  const balance = localStorage.getItem("balance");
  const token = localStorage.getItem("token");
  const { theme } = useTheme();
  const [activeField, setActiveField] = useState<"shares" | "amount" | null>(
    null
  );
  const [shareDetailAmount, setShareDetailAmount] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState(0);
  const [errorResponse, setErrorResponse] = useState<any>({});
  console.log(types, "types");

  const checkMarketISOpen = true;

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

  const rowDetailsId = rowDetails?.question?.id || rowDetails?.id;
  const orderDetailsGet = async () => {
    if (orderType == "buy") {
      if (activeField == "shares") {
        try {
          const response = await getOrdersQuoteDetails(
            rowDetailsId,
            optionIndex,
            debouncedValue
          );
          if (response?.success) {
            setAmount(response?.data?.grossCost?.toFixed(2) || "");
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
            rowDetailsId,
            optionIndex,
            debouncedValue
          );
          if (response?.success) {
            setShare(response?.data?.shares?.toFixed(2) || "");
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
    }

    if (orderType == "sell") {
      try {
        const response = await getCommonQuoteSell(
          rowDetailsId,
          optionIndex,
          debouncedValue
        );
        console.log(response, "getCommonQuoteSell");
        if (response?.success) {
          setErrorResponse({});
          setAmount(response?.data?.fee?.toFixed(2) || "");
          setShareDetailAmount(response?.data || {});
        } else {
          setErrorResponse(response || {});
          setAmount("");
          setShareDetailAmount({});
        }
      } catch (error) {
        setErrorResponse({});
        console.log(error, "getCommonQuoteSell===error");
        setAmount("");
        setShareDetailAmount({});
      }
    }
  };

  console.log(option, "orderType");
  useEffect(() => {
    if (!rowDetailsId) return;
    if (orderType && types === "market") {
      orderDetailsGet();
    }
  }, [debouncedValue, rowDetailsId, option?.index]);

  const handleClose = () => {
    setAmount("");
    setShare("");
    onClose();
  };

  const LimitFee = (Number(share) * Number(limitShare) * 2) / 100;
  const totalSharesBuy = Number(share) * Number(limitShare) + LimitFee;
  const totalSharesSell = Number(share) * Number(limitShare) - LimitFee;

  console.log(LimitFee, "LimitFee", totalSharesBuy, "minProceedsValue");

  const getUserBalance = async () => {
    try {
      const response = await userBalance();
      if (response?.success) {
        localStorage.setItem("balance", response?.data?.balance);
      } else {
        localStorage.removeItem("balance");
      }
    } catch (error: any) {
      localStorage.removeItem("balance");
    }
  };

  const handleSubmit = async () => {
    const reqBody = {
      questionId: rowDetailsId,
      outcomeIndex: optionIndex,
      side: orderType,
      type: types,
      shares:
        types === "limit" && orderType === "buy"
          ? share
          : types === "limit" && orderType === "sell"
          ? share
          : shareDetailAmount?.shares || "", //shares

      ...(types === "limit" && orderType === "buy"
        ? { maxCost: totalSharesBuy }
        : {}), // order type is limit adn buy

      ...(types === "limit" && orderType === "sell"
        ? { minProceeds: totalSharesSell }
        : {}), // order type is limit adn sell
      timeInForce: "IOC",
    };

    console.log(reqBody, "reqBody");

    try {
      const response = await submitOrder(reqBody);
      if (response?.success) {
        toast.success(response.message);
        getUserBalance();
        handleClose();
      } else {
      }
    } catch (error: any) {
      toast.error("internal server error");
    }
  };

  const getTotalSharesDetails =
    Number(rowDetails?.user?.[optionIndex]?.shares) || 0;

  console.log(getTotalSharesDetails, "getTotalSharesDetails======");
  console.log(debouncedValue, "debouncedValue======");

  const maxShares = option?.userPosition?.shares ?? 0;

  console.log(maxShares, maxShares, "maxShares");

  let buttonDisable = false;
  if (debouncedValue === 0) {
    buttonDisable = true;
  } else if (orderType === "buy" && types == "limit") {
    if (Number(balance) <= Number(totalSharesBuy)) {
      buttonDisable = true;
    }
  } else if (orderType === "sell" && types == "limit") {
    if (
      Number(share) >=
      Number(option?.userPosition?.shares || getTotalSharesDetails)
    ) {
      buttonDisable = true;
    }
  } else if (orderType === "buy" && types == "market") {
    if (Number(balance) <= Number(amount)) {
      buttonDisable = true;
    }
  } else {
    if (Number(share) >= Number(maxShares)) {
      buttonDisable = true;
    }
  }

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
          backgroundColor:
            theme == "dark"
              ? "rgba(15, 23, 42, 0.7)"
              : "rgba(255, 255, 255, 0.7)",
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
          className="bg-white dark:bg-[#0f172a] p-6 lg:p-10 rounded-xl overflow-hidden shadow-lg w-full max-w-[320px] lg:max-w-[430px] outline-none"
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 cursor-pointer text-gray-900 dark:text-gray-200 hover:text-gray-500"
          >
            ✕
          </button>

          <div className="flex flex-row gap-2 w-full justify-between mb-0">
            <Image
              src={BlockImg}
              alt="Block"
              width={60}
              height={60}
              className="rounded-lg max-h-[45px]"
            />
            <div className="w-full">
              <div className="text-sm w-[85%] text-black truncate   dark:text-white">
                {rowDetails?.question?.question || rowDetails?.question || "--"}{" "}
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-sm">Price</span> :
                <span className="text-sm">
                  {Number(option?.price || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex  text-wrap ml-14 mb-3 text-sm   gap-3">
            <span className="text-[#0099FF] text-nowrap font-semibold">
              {orderType === "buy" ? "Buy" : "Sell"} Now
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              - {option?.name || "--"}
            </span>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-300 mb-4 relative">
            <div className="absolute right-0 top-0">
              <Dropdown
                onSelect={(v) => {
                  setLimitShare("");
                  setShare("");
                  setTypes(v);
                }}
              />
            </div>

            <button
              onClick={() => {
                handleChangeOrderType("buy");
                setShareDetailAmount({});
                setErrorResponse({});
                setDebouncedValue(0);
                setAmount("");
                setShare("");
              }}
              className={`py-2 mr-6 font-medium ${
                orderType === "buy"
                  ? "border-b-2 border-[#0099FF] text-[#0099FF]"
                  : "text-gray-600 dark:text-gray-300 cursor-pointer"
              }`}
            >
              Buy
            </button>

            <button
              onClick={() => {
                handleChangeOrderType("sell");
                setErrorResponse({});
                setShareDetailAmount({});
                setDebouncedValue(0);
                setAmount("");
                setShare("");
              }}
              className={`py-2 font-medium ${
                orderType === "sell"
                  ? "border-b-2 border-[#0099FF] text-[#0099FF]"
                  : "text-gray-600 dark:text-gray-300 cursor-pointer"
              }`}
            >
              Sell
            </button>
          </div>

          <>
            <div className="flex flex-col gap-3">
              {types === "limit" ? (
                <>
                  {/* PRICE INPUT */}
                  <label className="w-full flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-medium">
                      {orderType === "sell" ? "Sell" : "Buy"} at price
                    </span>
                    <input
                      placeholder="0.00"
                      type="number"
                      value={limitShare}
                      onChange={(e) =>
                        setLimitShare(
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      onWheel={(e) => e.currentTarget.blur()}
                      className="w-full px-3 py-2 text-2xl font-semibold text-right bg-transparent border border-gray-300 dark:border-gray-700 rounded-md  text-gray-900 dark:text-gray-100  focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]  outline-none  "
                    />
                  </label>

                  <label className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700  rounded-md  flex items-center justify-between bg-transparent ">
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-gray-400 font-medium">
                        Quantity of Shares
                      </span>
                      <span className="text-xs text-[#0099FF] font-medium">
                        USD
                      </span>
                    </div>

                    <input
                      type="number"
                      placeholder="0.00"
                      onFocus={() => setActiveField("shares")}
                      value={share}
                      onChange={(e) =>
                        setShare(
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      onWheel={(e) => e.currentTarget.blur()}
                      className=" w-28 text-2xl font-semibold text-right bg-transparent  border-none outline-none text-gray-900 dark:text-gray-100"
                    />
                  </label>
                </>
              ) : orderType === "buy" ? (
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
                      className="border-none outline-none text-gray-800 dark:text-gray-300 text-3xl text-right w-56 bg-transparent"
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
                      className="border-none outline-none text-gray-800 dark:text-gray-300 text-3xl text-right w-56 bg-transparent"
                    />
                  </label>
                </>
              ) : (
                <>
                  {" "}
                  <label
                    className={`w-full p-3 border ${
                      errorResponse?.success == false
                        ? "border-red-400"
                        : "border-gray-200"
                    }  rounded-md flex justify-between items-center`}
                  >
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
                      max={
                        option?.userPosition?.shares ??
                        getTotalSharesDetails ??
                        0
                      }
                      value={share}
                      onFocus={() => setActiveField("shares")}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setShare(value);
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className="border-none outline-none text-gray-800 dark:text-gray-300 text-3xl text-right w-56 bg-transparent"
                    />
                  </label>
                </>
              )}
            </div>

            <div className="flex flex-row justify-between gap-2 mt-2">
              {" "}
              <div className="bg-[#0099FF] font-semibold text-white px-2 py-1 rounded">
                {" "}
                IOC{" "}
              </div>
              <div className="text-xs font-normal text-red-500">
                {errorResponse?.message || ""}
              </div>
            </div>

            <div className="flex text-black py-3 text-sm flex-col gap-2">
              <div className="text-[#0099FF] font-semibold text-lg">
                Share Details :
              </div>
              {types === "limit" && orderType == "buy" ? (
                <>
                  {token && (
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">
                        Available Balance
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        $ {Number(balance || 0).toFixed(2) || 0}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Fee</span>
                    <span className="dark:text-gray-300">
                      $ {Number(LimitFee || 0)?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Net Cost</span>
                    <span className="dark:text-gray-300">
                      $ {(Number(share) * Number(limitShare) || 0).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : types === "limit" && orderType == "sell" ? (
                <>
                  <div className="space-y-2  ">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">
                        Total Buy Share
                      </span>
                      <span className="text-gray-800 dark:text-gray-300 font-semibold">
                        {(
                          option?.userPosition?.shares ||
                          getTotalSharesDetails ||
                          0
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Fee</span>
                      <span className="dark:text-gray-300">
                        $ {LimitFee == 0 ? "" : "-"}{" "}
                        {Number(LimitFee || 0)?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Receive</span>
                      <span className="dark:text-gray-300">
                        $ {Number(totalSharesSell || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              ) : orderType === "buy" ? (
                <>
                  {token && (
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">
                        Available Balance
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        $ {Number(balance || 0).toFixed(2) || 0}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Fee</span>
                    <span className="dark:text-gray-300">
                      $ {Number(shareDetailAmount?.fee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-400 font-medium">Net Cost</span>
                    <span className="dark:text-gray-300">
                      $ {Number(shareDetailAmount?.netCost || 0).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2   py-2 ">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">
                        Total Buy Share
                      </span>
                      <span className="text-gray-800 dark:text-gray-300 font-semibold">
                        {(
                          option?.userPosition?.shares ||
                          getTotalSharesDetails ||
                          0
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Fee</span>
                      <span className="dark:text-gray-300">
                        $ {Number(shareDetailAmount?.fee || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-400 font-medium">Receive</span>
                      <span className="dark:text-gray-300">
                        ${" "}
                        {Number(shareDetailAmount?.netProceeds || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              disabled={buttonDisable}
              onClick={handleSubmit}
              className={`mt-4 py-3 text-lg text-white font-bold ${
                buttonDisable
                  ? "bg-[#62bdfa]"
                  : "bg-[#0099FF] hover:bg-[#0099FF]/90 cursor-pointer"
              }  rounded-xl w-full`}
            >
              <span className="capitalize">{orderType || "--"}</span>{" "}
              <span className="text-gray-200">$</span>{" "}
              <span className="text-gray-200">
                {types === "limit" && orderType === "buy"
                  ? totalSharesBuy
                  : types === "limit" && orderType === "sell"
                  ? totalSharesSell
                  : orderType == "buy"
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
